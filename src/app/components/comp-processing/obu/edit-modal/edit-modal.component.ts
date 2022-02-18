import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Obu } from 'src/app/components/domain/domain';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styles: [
  ]
})
export class EditModalComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public obu: Obu
  ) { }

  ngOnInit(): void {
    console.log(this.obu);
  }

}
