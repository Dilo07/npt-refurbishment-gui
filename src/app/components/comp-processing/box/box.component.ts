import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { SnackBar } from '@npt/npt-template';
import { Subscription } from 'rxjs';
import { BatchBoxService } from 'src/app/service/batch-box.service';
import { Batch, Box, Obu } from '../../domain/domain';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styles: [`
  .mat-progress-bar {
    height: 10px !important;
  }
  `
  ]
})
export class BoxComponent implements OnInit, OnDestroy {
  @Output() public boxTerminate = new EventEmitter<null>();
  @Input() batchOpen: Batch[] = [];
  public actualBox: Box;
  public panelOpenState = false;
  public opening = true;
  public closure = true;

  private subscription: Subscription[] = [];

  constructor(
    private snackBar: SnackBar,
    private batchBoxService: BatchBoxService
  ) { }

  ngOnInit(): void {
    // chiamata per vedere se ci sono scatole aperte
    this.batchBoxService.getBox().subscribe(
      box => { if (box) { this.actualBox = box; } }
    );
  }

  ngOnDestroy(): void {
    this.subscription.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

  public addBox(): void {
    this.subscription.push(this.batchBoxService.addBox().subscribe(
      box => this.actualBox = box,
      () => null,
      () => {
        this.batchOpen[0].countOpenBox++;
        this.snackBar.showMessage('BOX.ADD_BOX_SUCCESS', 'INFO');
      }
    ));
  }

  public addObu(obu: Obu): void {
    // aggiunge l'obu se il box di ritorno è null richiama i lotti
    this.subscription.push(this.batchBoxService.addObu(obu, this.closure, this.opening).subscribe(
      box => {
        if (!box) {

          this.boxTerminate.emit();
        }
        if (this.actualBox.id !== box?.id) { this.printLabelBox(this.actualBox.id); }
        this.actualBox = box;
      },
      () => null,
      () => {
        if (this.actualBox) {
          this.snackBar.showMessage('BOX.ADD_OBU_SUCCESS', 'INFO');
        }
      }
    ));
  }

  public closeBox(): void {
    // chiude la scatola se il box di ritorno è null richiama i lotti
    this.subscription.push(this.batchBoxService.closeBox(this.opening).subscribe(
      box => {
        if (!box) {
          this.boxTerminate.emit();
        }
        this.printLabelBox(this.actualBox.id);
        this.actualBox = box;
      }
    ));
  }

  private printLabelBox(idBox: number): void {
    console.log(idBox);
    this.subscription.push(this.batchBoxService.getBoxLabel(idBox).subscribe(
      data => null,
      () => null,
      () => null
    ));
  }

}
