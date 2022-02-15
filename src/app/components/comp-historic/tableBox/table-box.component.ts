import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { BatchBoxService } from 'src/app/service/batch-box.service';
import { Box } from '../../domain/domain';
import * as BrowserPrint from '../../../../assets/BrowserPrint-3.0.216.min.js';
declare const BrowserPrint: BrowserPrint;

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
    private batchBoxService: BatchBoxService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.getBoxList(this.idBox);
  }

  public getBoxList(id: number): void {
    this.subscription.push(this.batchBoxService.getBoxList(id).subscribe(
      boxList => this.dataSource.data = boxList
    ));
  }

  public async print(): Promise<void> {
    BrowserPrint.getDefaultDevice('printer', (device) => {
      console.log(device);
    });
    BrowserPrint.getStatus((status) => { console.log(status); });
    /* const device: Device = {
    name: 'zebra',
    deviceType: 'printer',
    connection: 'network',
    uid: '192.168.60.202:9100',
    provider: 'com.zebra.ds.webdriver.desktop.provider.DefaultDeviceProvider',
    manufacturer: 'Zebra Technologies',
    version: 0
  };
  const zpl = `^XA ^BY2,2,100 ^FO20,20^BC^FD001^FS ^XZ`;
  const zebra = new ZebraBrowserPrintWrapper(); */
    /* const defaulPrinter = await zebra.getDefaultPrinter();
    console.log(defaulPrinter); */
    /* zebra.setPrinter(device);
    const printerStatus = await zebra.checkPrinterStatus();
    console.log(printerStatus); */
    /* zebra.print(zpl); */
  }
}
