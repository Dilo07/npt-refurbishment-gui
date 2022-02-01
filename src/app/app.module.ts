import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ConfigInitService, getPropertyFromConfig, MaterialModule, TemplateNptModule } from '@npt/npt-template';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/comp-dashboard/dashboard.component';
import { MenuItemService } from './npt-template-menu/menu-item.service';
import { WorkstatNotfoundComponent } from './components/comp-workstat-notfound/workstat-notfound.component';

export const translateHttploader = (http: HttpClient): TranslateHttpLoader => new TranslateHttpLoader(http, 'assets/i18n/', '.json');


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    WorkstatNotfoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    TemplateNptModule,
    FlexLayoutModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (translateHttploader),
        deps: [HttpClient]
      }
    }),
  ],
  providers: [
    { provide: 'mail', useValue: 'mail'},
    {
      provide: 'mailData',
      useFactory: getPropertyFromConfig, multi: false, deps: ['mail', ConfigInitService]
    },
    { provide: 'batchDefault', useValue: 'batchDefault'},
    {
      provide: 'batchDefaultData',
      useFactory: getPropertyFromConfig, multi: false, deps: ['batchDefault', ConfigInitService]
    },
    // npt template
    { provide: 'menuService', useClass: MenuItemService },
    { provide: 'header', useValue: environment.header },
    { provide: 'footer', useValue: environment.footer },
    { provide: 'dashboard', useValue: '/dashboard'},
    { provide: 'env', useValue: environment.security },
    { provide: LocationStrategy, useClass: HashLocationStrategy},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
