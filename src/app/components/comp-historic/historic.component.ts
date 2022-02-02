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
  `
  ]
})
export class HistoricComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public panelOpenState = false;
  public complete = true;
  public dataSource = new MatTableDataSource<Batch>();
  public displayedColumns: string[] = ['id', 'lotNumber', 'hardware', 'dateIns', 'dateClose'];

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
