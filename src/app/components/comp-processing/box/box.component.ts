import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SnackBar } from '@npt/npt-template';
import { BatchBoxService } from 'src/app/service/batch-box.service';
import { Batch, Box, Obu } from '../../domain/domain';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styles: [`
  ::ng-deep .mat-progress-bar {
    height: 10px !important;
  }
  `
  ]
})
export class BoxComponent implements OnInit {
  @Output() public boxTerminate = new EventEmitter<null>();
  @Input() batchOpen: Batch[] = [];
  public actualBox: Box;
  public panelOpenState = false;

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

  public addBox(): void {
    this.batchBoxService.addBox().subscribe(
      box => this.actualBox = box,
      () => null,
      () => {
        this.batchOpen[0].countOpenBox++;
        this.snackBar.showMessage('BOX.ADD_BOX_SUCCESS', 'INFO');
      }
    );
  }

  public addObu(obu: Obu): void {
    this.batchBoxService.addObu(obu).subscribe(
      box => {
        if (!box) {
          this.boxTerminate.emit();
        }
        this.actualBox = box;
      },
      () => null,
      () => {
        if (this.actualBox) {
          this.snackBar.showMessage('BOX.ADD_OBU_SUCCESS', 'INFO');
        }
      }
    );
  }

}
