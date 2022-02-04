import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-workstat-notfound',
  templateUrl: './workstat-notfound.component.html',
  styles: [`
  .img-responsive {
    max-width: 300px;
    height: 300px;
  }
  `
  ]
})
export class WorkstatNotfoundComponent {

  constructor(
    @Inject('mailData') public mail: string
  ) { }

}
