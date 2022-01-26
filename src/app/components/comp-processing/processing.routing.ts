import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoxComponent } from './box/box.component';
import { PageProcessingComponent } from './page.component';

const routes: Routes = [
  { path: '', component: PageProcessingComponent },
  { path: 'box', component: BoxComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoxRoutingModule { }
