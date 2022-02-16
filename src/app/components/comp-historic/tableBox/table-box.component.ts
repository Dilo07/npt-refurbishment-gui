import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SnackBar } from '@npt/npt-template';
import { Subscription } from 'rxjs';
import { BatchBoxService } from 'src/app/service/batch-box.service';
import ZebraBrowserPrintWrapper from 'zebra-browser-print-wrapper';
import { Device } from 'zebra-browser-print-wrapper/lib/types';
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
    private snackBar: SnackBar
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.getBoxList(this.idBox);
  }

  public getBoxList(id: number): void {
    this.subscription.push(this.batchBoxService.getBoxList(id).subscribe(
      boxList => this.dataSource.data = boxList
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
    /* const device: Device = {
      name: 'zebra',
      deviceType: 'printer',
      connection: 'network',
      uid: '192.168.60.202:9100',
      provider: 'com.zebra.ds.webdriver.desktop.provider.DefaultDeviceProvider',
      manufacturer: 'Zebra Technologies',
      version: 0
    }; */
    const zplTest = `^XA^FO120,120^BY3,3,100^BCN,100,Y,N,N^AD,60^FDSAT22-000092-50014^FS^XZ`;
    const zebra = new ZebraBrowserPrintWrapper();
    /* const defaulPrinter = await zebra.getDefaultPrinter();
    console.log(defaulPrinter); */
    const availablePrinter: Device[] = await zebra.getAvailablePrinters();
    console.log(availablePrinter);
    availablePrinter.forEach(printer => {
      if(printer.name === 'zebra'){
        zebra.setPrinter(printer);
      }
    });
    const printerStatus = await zebra.checkPrinterStatus();
    console.log(printerStatus);
    if( printerStatus.isReadyToPrint){
      /* zebra.print(zpl); */
    }else {
      this.snackBar.showMessage(printerStatus.errors, 'ERROR');
    }
  }
}
