import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { BatchBoxService } from 'src/app/service/batch-box.service';
import { Box, Hardware, Obu } from '../../domain/domain';
import { EditModalComponent } from './edit-modal/edit-modal.component';

@Component({
  selector: 'app-obu',
  templateUrl: './obu.component.html',
  styles: [
    `
    .disableButton:disabled {
      color: black;
    }
    `
  ]
})
export class ObuComponent implements OnInit, OnDestroy {
  @Output() public addObuEvent = new EventEmitter<Obu>();
  @Input() public actualBox: Box;
  public formGroup: FormGroup;
  public panelOpenState = false;
  public productDate = '';
  public isArianI: boolean;

  private subscription: Subscription[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private batchBoxService: BatchBoxService,
    public dialog: MatDialog
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

  ngOnDestroy(): void {
    this.subscription.forEach(subscription => {
      subscription.unsubscribe();
    });
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

  editObu(obu: Obu): void {
    const dialogRef = this.dialog.open(EditModalComponent, {
      width: '50%',
      height: '40%',
      data: obu
    });
    dialogRef.afterClosed().subscribe(
      isEdit => {
        if (isEdit) {
          this.subscription.push(this.batchBoxService.getObuListByBox(this.actualBox.id).subscribe(
            obuList => this.actualBox.obuList = obuList
          ));
        }
      }
    );
  }
}
