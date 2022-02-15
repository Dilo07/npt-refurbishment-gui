import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BatchBoxService } from 'src/app/service/batch-box.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Batch, Box } from '../domain/domain';
import { Subscription } from 'rxjs';
import * as BrowserPrint from '../../../assets/BrowserPrint-3.0.216.min.js';
declare var BrowserPrint: any;
@Component({
  selector: 'app-historic',
  templateUrl: './historic.component.html',
  styleUrls: ['./historic.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class HistoricComponent implements OnInit, OnDestroy {
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public panelOpenState = false;
  public complete = true;
  public expandedElement: Batch | null;
  public dataSource = new MatTableDataSource<Batch>();
  public displayedColumns: string[] = ['expandButton', 'id', 'lotNumber', 'hardware', 'dateIns', 'dateClose', 'action'];
  public boxList: Box[] = [];

  private subscription: Subscription[] = [];

  constructor(
    private batchBoxService: BatchBoxService
  ) { }

  ngOnInit(): void {
    this.complete = false;
    this.subscription.push(this.batchBoxService.getLotList(false).subscribe(
      lotList => (this.dataSource.data = lotList, this.dataSource.paginator = this.paginator),
      () => this.complete = true,
      () => this.complete = true
    ));
  }

  ngOnDestroy(): void {
    this.subscription.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

  public getBoxList(id: number): void {
    this.subscription.push(this.batchBoxService.getBoxList(id).subscribe(
      boxList => this.boxList = boxList,
      () => null,
      () => this.ngOnDestroy()
    ));
  }

  public sendXml(id: number): void {
    this.batchBoxService.genLotXML(id).subscribe(
      data => console.log(data)
    );
  }

  public async print(): Promise<void> {
    console.log(BrowserPrint);
    BrowserPrint.getDefaultDevice("printer", function(device)
    {  alert(device);}
    , function(error){
      alert(error);
    });
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
