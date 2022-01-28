import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackBar } from '@npt/npt-template';
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
  public panelOpenState = false;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: SnackBar,
    private batchBoxService: BatchBoxService
  ) { }

  ngOnInit(): void {
    // chiamata per vedere se ci sono scatole aperte
    this.batchBoxService.getBox().subscribe(
      box => { if (box) { this.actualBox = box; } }
    );
    this.createForm();
  }

  public addBox(): void {
    this.batchBoxService.addBox().subscribe(
      box => this.actualBox = box,
      () => null,
      () => {
        this.batchOpen[0].countOpenBox ++;
        this.snackBar.showMessage('BOX.ADD_BOX', 'INFO');
      }
    );
  }

  public addObu(): void {
    const obu = new Obu();
    obu.extendedObuId = this.formGroup.get('ctrlObuId').value;
    obu.iccId = this.formGroup.get('ctrlIccId').value;
    this.batchBoxService.addObu(obu).subscribe(
      box => this.actualBox = box,
      () => null,
      () => {
        this.listObu.push({ obuId: this.formGroup.get('ctrlObuId').value, iccId: this.formGroup.get('ctrlIccId').value });
        this.formGroup.patchValue({
          ctrlObuId: '',
          ctrlIccId: ''
        });
        this.snackBar.showMessage('BOX.ADD_OBU', 'INFO');
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
