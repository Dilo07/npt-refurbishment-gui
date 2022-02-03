import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BatchBoxService } from 'src/app/service/batch-box.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Batch, Box } from '../domain/domain';
import { Subscription } from 'rxjs';

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
  public displayedColumns: string[] = ['expandButton', 'id', 'lotNumber', 'hardware', 'dateIns', 'dateClose'];
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

  getBoxList(id: number): void {
    this.subscription.push(this.batchBoxService.getBoxList(id).subscribe(
      boxList => this.boxList = boxList,
      () => null,
      () => this.ngOnDestroy()
    ));
  }

}
