import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '@npt/npt-template';
import { HistoricComponent } from './historic.component';
import { HistoricRoutingModule } from './historic.routing';
import { TableBoxComponent } from './tableBox/table-box.component';

@NgModule({
  declarations: [
    HistoricComponent,
    TableBoxComponent
  ],
  imports: [
    CommonModule,
    HistoricRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class HistoricModule { }
