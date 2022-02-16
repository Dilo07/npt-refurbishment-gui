import { Component, Inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SnackBar } from '@npt/npt-template';
import { Subscription } from 'rxjs';
import { BatchBoxService } from 'src/app/service/batch-box.service';
import { PrintService } from 'src/app/service/print.service';
import { Box } from '../../domain/domain';

@Component({
  selector: 'app-table-box',
  templateUrl: './table-box.component.html',
  styles: [`
  table {
    width: 1000px;
  }
  `
  ]
})
export class TableBoxComponent implements OnChanges {
  @Input() idBox: number;
  public dataSource = new MatTableDataSource<Box>();
  public displayedColumns: string[] = ['id', 'workstationId', 'dateIns', 'dateClose', 'actions'];

  private subscription: Subscription[] = [];

  constructor(
    private batchBoxService: BatchBoxService,
    private snackBar: SnackBar,
    private printerService: PrintService,
    @Inject('disablePrintData') private disablePrint: boolean
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.getBoxList(this.idBox);
  }

  public getBoxList(id: number): void {
    this.subscription.push(this.batchBoxService.getBoxList(id).subscribe(
      boxList => this.dataSource.data = boxList,
      () => null,
      () => null
    ));
  }

  public print(idBox: number): void {
    this.subscription.push(this.batchBoxService.getBoxLabel(idBox).subscribe(
      (zpl) => this.printerService.sendPrint(zpl),
      () => null,
      () => null
    ));
  }
  /* const zplTest = `^XA^FO120,120^BY3,3,100^BCN,100,Y,N,N^AD,60^FDSAT22-000092-50014^FS^XZ`; */

}
