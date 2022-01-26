import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styles: [
  ]
})
export class PageProcessingComponent implements OnInit {
  public batchOpen: boolean;
  public formGroup: FormGroup;
  public allHardware = [1, 2, 3, 4];

  constructor(
    private formBuilder: FormBuilder,
    @Inject('batchDefaultData') private batchDefault: string
  ) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      ctrlBatch1: ['', Validators.required],
      ctrlBatch2: ['', Validators.required],
      ctrlBatch3: [this.batchDefault, Validators.required],
      ctrlHrdw: [4, Validators.required],
      ctrlBoxNum: ['', Validators.required]
    });
  }

}
