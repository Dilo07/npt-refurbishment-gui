import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Obu } from 'src/app/components/domain/domain';
import { BatchBoxService } from 'src/app/service/batch-box.service';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styles: [
  ]
})
export class EditModalComponent implements OnInit {
  public formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private batchBoxService: BatchBoxService,
    public dialogRef: MatDialogRef<EditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public obu: Obu
  ) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      ctrlObuId: [this.obu.extendedObuId, [Validators.pattern(/^\d+$/), Validators.minLength(24), Validators.maxLength(24)]],
      ctrlIccId: [this.obu.iccId, [Validators.pattern(/^\d+$/), Validators.minLength(19), Validators.maxLength(19)]]
    });
  }

  editObu(): void {
    const obu = new Obu();
    obu.extendedObuId = this.formGroup.get('ctrlObuId').value;
    obu.iccId = this.formGroup.get('ctrlIccId').value;
    this.batchBoxService.editObu(obu).subscribe(
      data => console.log(data)
    );
  }
}
