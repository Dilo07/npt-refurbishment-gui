import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { SnackBar } from '@npt/npt-template';
import { Subscription } from 'rxjs';
import { BatchBoxService } from 'src/app/service/batch-box.service';
import { PrintService } from 'src/app/service/print.service';
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
  @Input() batchOpen: Batch;
  public actualBox: Box;
  public panelOpenState = false;
  public opening = true;
  public closure = true;

  private subscription: Subscription[] = [];

  constructor(
    private snackBar: SnackBar,
    private batchBoxService: BatchBoxService,
    private printerService: PrintService
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
        this.batchOpen.countOpenBox++;
        this.snackBar.showMessage('BOX.ADD_BOX_SUCCESS', 'INFO');
      }
    ));
  }

  public addObu(obu: Obu): void {
    // aggiunge l'obu se il box di ritorno è null richiama i lotti
    this.subscription.push(this.batchBoxService.addObu(obu, this.closure, this.opening).subscribe(
      box => {
        if (!box) { // se il lotto è terminato
          this.boxTerminate.emit();
        }
        if (this.actualBox.id !== box?.id) { // se la scatola è cambiata stampa
          this.printLabelBox(this.actualBox.id);
          this.snackBar.showMessage('BOX.CLOSE_BOX_SUCCESS', 'INFO');
        }else {
          this.snackBar.showMessage('BOX.ADD_OBU_SUCCESS', 'INFO');
        }
        this.actualBox = box;
      }
    ));
  }

  public closeBox(): void {
    this.printLabelBox(this.actualBox.id);
    // chiude la scatola se il box di ritorno è null richiama i lotti
    this.subscription.push(this.batchBoxService.closeBox(this.opening).subscribe(
      box => {
        if (!box) {
          this.boxTerminate.emit();
        }
        this.actualBox = box;
      }
    ));
  }

  private printLabelBox(idBox: number): void {
    this.subscription.push(this.batchBoxService.getBoxLabel(idBox).subscribe(
      zpl => this.printerService.sendPrint(zpl),
      () => null,
      () => null
    ));
  }

}
