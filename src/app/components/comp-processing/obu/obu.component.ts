import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Box, Obu } from '../../domain/domain';

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

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      ctrlObuId: ['', [Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.minLength(24), Validators.maxLength(24)]],
      ctrlIccId: ['', [Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.minLength(19), Validators.maxLength(19)]]
    });
  }

  addObu(): void{
    if(!this.formGroup.invalid){
      const obu = new Obu();
      obu.extendedObuId = this.formGroup.get('ctrlObuId').value;
      obu.iccId = this.formGroup.get('ctrlIccId').value;
      this.addObuEvent.emit(obu);
      this.formGroup.patchValue({
        ctrlObuId: '',
        ctrlIccId: ''
      });
    }
  }
}
