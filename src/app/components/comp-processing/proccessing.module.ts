import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoxRoutingModule } from './processing.routing';
import { BoxComponent } from './box/box.component';
import { PageProcessingComponent } from './page.component';
import { MaterialModule } from '@npt/npt-template';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ObuComponent } from './obu/obu.component';


@NgModule({
  declarations: [
    BoxComponent,
    PageProcessingComponent,
    ObuComponent
  ],
  imports: [
    CommonModule,
    BoxRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class BoxModule { }
