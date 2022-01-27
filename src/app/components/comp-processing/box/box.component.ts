import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BatchBoxService } from 'src/app/service/batch-box.service';
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
  @Input() batchOpen: Batch[] = [];
  public formGroup: FormGroup;
  public boxOpen = false;
  public listObu: { obuId: string; iccId: string }[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private batchBoxService: BatchBoxService
  ) { }

  ngOnInit(): void {
    this.batchBoxService.getBox().subscribe(
      box => {
        if (box) {
          this.boxOpen = true;
        }
      }
    );
    this.createForm();
  }

  public addBox(): void {
    this.batchBoxService.addBox().subscribe(
      data => console.log(data),
      () => null,
      () => this.boxOpen = true
    );
  }

  public addObu(): void {
    this.listObu.push({ obuId: this.formGroup.get('ctrlObuId').value, iccId: this.formGroup.get('ctrlIccId').value });
    this.formGroup.patchValue({
      ctrlObuId: '',
      ctrlIccId: ''
    });
  }

  private createForm(): void {
    this.formGroup = this.formBuilder.group({
      ctrlObuId: ['', [Validators.minLength(24), Validators.maxLength(24)]],
      ctrlIccId: ['', [Validators.minLength(20), Validators.maxLength(20)]]
    });
  }

}
