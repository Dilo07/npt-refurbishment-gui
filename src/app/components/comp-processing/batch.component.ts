import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { SnackBar } from '@npt/npt-template';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { BatchBoxService } from 'src/app/service/batch-box.service';
import { Batch, Hardware } from '../domain/domain';

@Component({
  selector: 'app-page',
  templateUrl: './batch.component.html',
  styles: [
  ]
})
export class BatchComponent implements OnInit, OnDestroy {
  public batchOpen: boolean;
  public formGroup: FormGroup;
  public allHardware = [Hardware['arianna I'], Hardware['arianna II'], Hardware['even x'], Hardware['obu Go']];
  public activeBatch: Batch[] = [];
  public complete = true;

  private subscription: Subscription[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private batchBoxService: BatchBoxService,
    private snackBar: SnackBar,
    @Inject('batchDefaultData') private batchDefault: string
  ) { }

  ngOnInit(): void {
    this.getLotSequence();
    this.getBatch();
  }

  ngOnDestroy(): void {
    this.subscription.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

  public getBatch(verifyEnd?: boolean): void {
    this.complete = false;
    // chiamata per vedere se ci sono lotti aperti
    this.subscription.push(this.batchBoxService.getLotList(true).subscribe(
      list => {
        if (list.length > 0) {
          this.activeBatch = list;
          this.batchOpen = true;
        } else {
          this.batchOpen = false;
          if (verifyEnd) {
            this.snackBar.showMessage('PROCESSING.BATCH_END', 'INFO');
          }
        }
      },
      () => this.complete = true,
      () => this.complete = true
    ));
  }

  public addBatch(): void {
    const formBatch = new Batch();
    const sequence = this.formGroup.get('ctrlSequence').value;
    const year = this.formGroup.get('ctrlYear').value;
    const supplierCode = this.formGroup.get('ctrlSupc').value;
    formBatch.sequenceNumber = sequence;
    formBatch.yearNumber = year;
    formBatch.supplierCode = supplierCode;
    /* formBatch.lotNumber = batch1 + '/' + batch2 + '/' + batch3; */
    formBatch.hardware = this.formGroup.get('ctrlHrdw').value;
    formBatch.boxNumber = this.formGroup.get('ctrlBoxNum').value;
    formBatch.boxSize = this.formGroup.get('ctrlBoxSize').value;
    // invia il lotto e cambia componente nella view
    this.subscription.push(this.batchBoxService.addBatch(formBatch).subscribe(
      (lot) => this.activeBatch.push(lot),
      () => null,
      () => this.snackBar.showMessage('PROCESSING.BATCH_CREATE', 'INFO')
    ));
  }

  private createForm(sequence: string): void {
    const year = moment().year().toString().substring(2);
    this.formGroup = this.formBuilder.group({
      ctrlSequence: [sequence + year, [Validators.required, Validators.pattern(/^\d+$/), Validators.minLength(6), Validators.maxLength(6)]],
      ctrlYear: [year, [Validators.required, Validators.pattern(/^\d+$/), Validators.minLength(2), Validators.maxLength(2)]],
      ctrlSupc: [this.batchDefault, [Validators.required, Validators.pattern(/^\d+$/), Validators.minLength(5), Validators.maxLength(5)]],
      ctrlHrdw: [Hardware['arianna I'], Validators.required],
      ctrlBoxNum: [100, Validators.required],
      ctrlBoxSize: [48, Validators.required]
    }, { validators: this.yearValidator() });
  }

  private getLotSequence(): void {
    const year = moment().year().toString().substring(2);
    this.subscription.push(this.batchBoxService.getLotSequence(year).subscribe(
      seq => this.createForm(seq),
      () => null,
      () => null
    ));
  }

  private yearValidator = () => (group: FormGroup): ValidationErrors | null => {
    const yearSeq = String(group.controls.ctrlSequence.value).slice(-2);
    const year = group.controls.ctrlYear.value;
    if (yearSeq !== year) {
      return { yearValidator: true };
    } else {
      return null;
    }
  };

}
