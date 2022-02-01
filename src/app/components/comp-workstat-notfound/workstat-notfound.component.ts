import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-workstat-notfound',
  templateUrl: './workstat-notfound.component.html',
  styles: [
  ]
})
export class WorkstatNotfoundComponent {

  constructor(
    @Inject('mailData') public mail: string
  ) { }

}
