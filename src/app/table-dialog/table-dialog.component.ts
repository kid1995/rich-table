import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormGroup} from '@angular/forms';
import * as _ from 'lodash';
import {ObjectUtils} from '../utils/object-utils';
import {BaseRichTableRow} from '../models/BaseRichTableRow';
import {ITableDialog} from './ITableDialog';


@Component({
  selector: 'app-table-dialog',
  templateUrl: './table-dialog.component.html',
  styleUrls: ['./table-dialog.component.css']
})
export class TableDialogComponent<T extends BaseRichTableRow, U> implements OnInit, ITableDialog {

  dialogBuffer: any;
  dialogRef: MatDialogRef<U>;
  form: FormGroup;

  constructor(dialogRef: MatDialogRef<U>,
              @Inject(MAT_DIALOG_DATA) data) {
    this.dialogRef = dialogRef;
    if (!_.isNil(data)) {
      this.dialogBuffer = data;

    }
  }

  ngOnInit() {
    if (!_.isNil(this.dialogBuffer)) {
      this.setValueToForm(this.dialogBuffer);
    }
  }

  setFormGroup(form: FormGroup) {
    this.form = form;
  }

  onSubmit() {
    const value = this.getValueFromForm();
    this.dialogRef.close(value);
  }

  setValueToForm(toCreateObj: any) {
    return;
  }

  getValueFromForm(): any {
    return;
  }

  onClear() {
    this.form.reset();
  }

  onClose() {
    this.dialogRef.close();
  }

  getDialogBuffer() {
    return this.dialogBuffer;
  }
}
