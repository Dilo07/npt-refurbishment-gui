import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/comp-dashboard/dashboard.component';
import { WorkstatNotfoundComponent } from './components/comp-workstat-notfound/workstat-notfound.component';
import { WorkStationGuard } from './core/wsGuard';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard', component: DashboardComponent,
    canActivate: [WorkStationGuard]
  },
  {
    path: 'processing',
    loadChildren: () => import('./components/comp-processing/proccessing.module').then(m => m.BoxModule), canActivate: [WorkStationGuard]
  },
  {
    path: 'historic',
    loadChildren: () => import('./components/comp-historic/historic.module').then(m => m.HistoricModule), canActivate: [WorkStationGuard]
  },
  { path: 'workstation-notfound', component: WorkstatNotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
