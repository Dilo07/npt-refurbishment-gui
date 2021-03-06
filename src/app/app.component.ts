import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PrintService } from './service/print.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private translateService: TranslateService,
    private printService: PrintService // inizializzazione stampante
  ) { }

  ngOnInit(): void {
    this.setI18n();
    console.log('postazione ' + localStorage.getItem('guId'));
  }

  private setI18n(): void {
    this.translateService.addLangs(['it', 'en']);
    this.translateService.setDefaultLang('it');
    this.translateService.use('it');
  }
}
