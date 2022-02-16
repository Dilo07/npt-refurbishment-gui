import { Component } from '@angular/core';
import { PrintService } from 'src/app/service/print.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  // inizializzazione stampante
  constructor(private printService: PrintService) {}

}
