import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SnackBar } from '@npt/npt-template';
import { Subscription } from 'rxjs';
import { BatchBoxService } from 'src/app/service/batch-box.service';
import ZebraBrowserPrintWrapper from 'zebra-browser-print-wrapper';
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
  @Input() printer: ZebraBrowserPrintWrapper; // arriva una printer già settata
  public dataSource = new MatTableDataSource<Box>();
  public displayedColumns: string[] = ['id', 'workstationId', 'dateIns', 'dateClose', 'actions'];

  private subscription: Subscription[] = [];

  constructor(
    private batchBoxService: BatchBoxService,
    private snackBar: SnackBar
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
    let zpl: string;
    this.subscription.push(this.batchBoxService.getBoxLabel(idBox).subscribe(
      data => zpl = data,
      () => null,
      () => this.callPrinter(zpl)
    ));
  }

  private async callPrinter(zpl: string): Promise<void> {
    /* const zebra = new ZebraBrowserPrintWrapper(); */
    /* const defaulPrinter = await zebra.getDefaultPrinter();
    console.log(defaulPrinter); */
    /* const zplTest = `^XA^FO120,120^BY3,3,100^BCN,100,Y,N,N^AD,60^FDSAT22-000092-50014^FS^XZ`; */
    const printerStatus = await this.printer.checkPrinterStatus();
    console.log(printerStatus);
    if( printerStatus.isReadyToPrint){
      /* this.printer.print(zpl); */
    }else {
      this.snackBar.showMessage(printerStatus.errors, 'ERROR');
    }
  }
}
