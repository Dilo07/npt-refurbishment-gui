import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackBar } from '@npt/npt-template';
import { BatchBoxService } from 'src/app/service/batch-box.service';
import { Batch, Hardware } from '../domain/domain';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styles: [
  ]
})
export class PageProcessingComponent implements OnInit {
  public batchOpen = false;
  public formGroup: FormGroup;
  public allHardware = [Hardware['arianna I'], Hardware['arianna II'], Hardware['even x'], Hardware['obu Go']];
  public activeBatch: Batch[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private batchBoxService: BatchBoxService,
    private snackBar: SnackBar,
    @Inject('batchDefaultData') private batchDefault: string
  ) { }

  ngOnInit(): void {
    this.createForm();
    // chiamata per vedere se ci sono lotti aperti
    this.batchBoxService.getLotList(true).subscribe(
      list => {
        if (list.length > 0) {
          this.activeBatch = list;
          this.batchOpen = true;
        }
      }
    );
  }

  public addBatch(): void {
    const formBatch = new Batch();
    const batch1 = this.formGroup.get('ctrlBatch1').value;
    const batch2 = this.formGroup.get('ctrlBatch2').value;
    const batch3 = this.formGroup.get('ctrlBatch3').value;
    formBatch.lotNumber = batch1 + '/' + batch2 + '/' + batch3;
    formBatch.hardware = this.formGroup.get('ctrlHrdw').value;
    formBatch.boxNumber = this.formGroup.get('ctrlBoxNum').value;
    formBatch.boxSize = this.formGroup.get('ctrlBoxSize').value;
    // invia il lotto e cambia componente nella view
    this.batchBoxService.addBatch(formBatch).subscribe(
      (lot) => this.activeBatch.push(lot),
      () => null,
      () => this.snackBar.showMessage('PROCESSING.BATCH_CREATE', 'INFO')
    );
  }

  private createForm(): void {
    this.formGroup = this.formBuilder.group({
      ctrlBatch1: ['', Validators.required],
      ctrlBatch2: ['', Validators.required],
      ctrlBatch3: [this.batchDefault, Validators.required],
      ctrlHrdw: [Hardware['arianna I'], Validators.required],
      ctrlBoxNum: [100, Validators.required],
      ctrlBoxSize: [48, Validators.required]
    });
  }
}
