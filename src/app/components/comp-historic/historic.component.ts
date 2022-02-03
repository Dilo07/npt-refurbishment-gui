import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BatchBoxService } from 'src/app/service/batch-box.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Batch } from '../domain/domain';

@Component({
  selector: 'app-historic',
  templateUrl: './historic.component.html',
  styles: [`
  table {
  width: 100%;
  background-color: aliceblue;
  }
  .mat-column-expandButton { max-width: 2px; }
  .mat-column-id { max-width: 18%;}
  .mat-column-lotNumber { max-width: 20%}
  .mat-column-hardware { max-width: 20%}
  .mat-column-dateIns { max-width: 20%}
  .mat-column-dateClose { max-width: 20%}
  `
  ],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class HistoricComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public panelOpenState = false;
  public complete = true;
  public expandedElement: Batch | null;
  public dataSource = new MatTableDataSource<Batch>();
  public displayedColumns: string[] = ['expandButton', 'id', 'lotNumber', 'hardware', 'dateIns', 'dateClose'];

  constructor(
    private batchBoxService: BatchBoxService
  ) { }

  ngOnInit(): void {
    this.complete = false;
    this.batchBoxService.getLotList(false).subscribe(
      lotList => (this.dataSource.data = lotList, this.dataSource.paginator = this.paginator),
      () => this.complete = true,
      () => this.complete = true
    );
  }

}
