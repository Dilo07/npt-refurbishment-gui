import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BatchBoxService } from 'src/app/service/batch-box.service';
import { Batch, Box, Obu } from '../../domain/domain';

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
  public actualBox: Box;
  public formGroup: FormGroup;
  public listObu: { obuId: string; iccId: string }[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private batchBoxService: BatchBoxService
  ) { }

  ngOnInit(): void {
    console.log(this.batchOpen)
    // chiamata per vedere se ci sono scatole aperte
    this.batchBoxService.getBox().subscribe(
      box => { if (box) { this.actualBox = box; console.log(this.actualBox); } }
    );
    this.createForm();
  }

  public addBox(): void {
    this.batchBoxService.addBox().subscribe(
      box => this.actualBox = box,
    );
  }

  public addObu(): void {
    const obu = new Obu();
    obu.extendedObuId = this.formGroup.get('ctrlObuId').value;
    obu.iccId = this.formGroup.get('ctrlIccId').value;
    this.batchBoxService.addObu(obu).subscribe(
      data => console.log(data),
      () => null,
      () => {
        this.listObu.push({ obuId: this.formGroup.get('ctrlObuId').value, iccId: this.formGroup.get('ctrlIccId').value });
        this.formGroup.patchValue({
          ctrlObuId: '',
          ctrlIccId: ''
        });
      }
    );
  }

  private createForm(): void {
    this.formGroup = this.formBuilder.group({
      ctrlObuId: ['', [Validators.minLength(24), Validators.maxLength(24)]],
      ctrlIccId: ['', [Validators.minLength(20), Validators.maxLength(20)]]
    });
  }

}
