import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoxRoutingModule } from './processing.routing';
import { BoxComponent } from './box/box.component';


@NgModule({
  declarations: [
    BoxComponent
  ],
  imports: [
    CommonModule,
    BoxRoutingModule
  ]
})
export class BoxModule { }
