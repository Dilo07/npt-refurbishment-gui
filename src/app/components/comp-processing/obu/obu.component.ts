import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Box, Hardware, Obu } from '../../domain/domain';

@Component({
  selector: 'app-obu',
  templateUrl: './obu.component.html',
  styles: [
  ]
})
export class ObuComponent implements OnInit {
  @Output() public addObuEvent = new EventEmitter<Obu>();
  @Input() public actualBox: Box;
  public formGroup: FormGroup;
  public panelOpenState = false;
  public productDate = '';
  public isArianI: boolean;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.isArianI = this.actualBox.lot.hardware === Hardware['arianna I'];
    if (this.isArianI) {
      this.formGroup = this.formBuilder.group({
        ctrlObuId: ['', [Validators.pattern(/^\d+$/), Validators.minLength(15), Validators.maxLength(15)]],
        ctrlProductDate: [this.productDate, [Validators.pattern(/^\d+$/), Validators.minLength(4), Validators.maxLength(4)]],
        ctrlIccId: ['', [Validators.pattern(/^\d+$/), Validators.minLength(19), Validators.maxLength(19)]]
      });
    } else {
      this.formGroup = this.formBuilder.group({
        ctrlObuId: ['', [Validators.pattern(/^\d+$/), Validators.minLength(24), Validators.maxLength(24)]],
        ctrlIccId: ['', [Validators.pattern(/^\d+$/), Validators.minLength(19), Validators.maxLength(19)]]
      });
    }
  }

  addObu(): void {
    if (!this.formGroup.invalid) {
      const obu = new Obu();
      obu.extendedObuId = this.isArianI ? this.formGroup.get('ctrlObuId').value + '01676' + this.formGroup.get('ctrlProductDate').value :
        this.formGroup.get('ctrlObuId').value;
      obu.iccId = this.formGroup.get('ctrlIccId').value;
      this.addObuEvent.emit(obu);
      this.formGroup.patchValue({
        ctrlObuId: '',
        ctrlIccId: ''
      });
    }
  }
}
