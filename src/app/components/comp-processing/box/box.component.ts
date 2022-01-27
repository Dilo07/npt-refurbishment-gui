import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Batch } from '../../domain/domain';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styles: [`
  ::ng-deep .mat-progress-bar {
    height: 10px !important;
  }
  `
  ]
})
export class BoxComponent implements OnInit {
  @Input() batchOpen: Batch[];
  public formGroup: FormGroup;
  public boxOpen = false;
  public listObu: { obuId: string; iccId: string }[] = [];

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      ctrlObuId: ['', [Validators.minLength(24), Validators.maxLength(24)]],
      ctrlIccId: ['', [Validators.minLength(20), Validators.maxLength(20)]]
    });
  }

  public addObu(): void {
    this.listObu.push({ obuId: this.formGroup.get('ctrlObuId').value, iccId: this.formGroup.get('ctrlIccId').value });
    this.formGroup.patchValue({
      ctrlObuId: '',
      ctrlIccId: ''
    });
  }

}
