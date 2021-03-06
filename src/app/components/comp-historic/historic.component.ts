import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { BatchBoxService } from 'src/app/service/batch-box.service';
import { Batch } from '../domain/domain';

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
  @ViewChild(MatSort) sort: MatSort;
  public panelOpenState = false;
  public complete = true;
  public expandedElement: Batch | null;
  public dataSource = new MatTableDataSource<Batch>();
  public displayedColumns: string[] = ['expandButton', 'id', 'lotNumber', 'hardware', 'dateIns', 'dateClose', 'action'];

  private subscription: Subscription[] = [];

  constructor(
    private batchBoxService: BatchBoxService
  ) { }

  ngOnInit(): void {
    this.getLotList();
  }

  ngOnDestroy(): void {
    this.subscription.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

  public sendXml(id: number): void {
    this.batchBoxService.genLotXML(id).subscribe(
      () => null,
      () => null,
      () => this.getLotList()
    );
  }

  private getLotList(): void {
    this.complete = false;
    this.subscription.push(this.batchBoxService.getLotList(false).subscribe(
      lotList => (this.dataSource.data = lotList, this.dataSource.paginator = this.paginator, this.dataSource.sort = this.sort),
      () => this.complete = true,
      () => this.complete = true
    ));
  }

}
