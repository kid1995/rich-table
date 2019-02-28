import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Dessert} from '../../table-view/test-model/Dessert';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ITableDialog} from '../ITableDialog';
import {TableDialogComponent} from '../table-dialog.component';
import {DessertRow} from '../../table-view/test-model/DessertRow';
import {MatIconRegistry} from '@angular/material';

import * as _ from 'lodash';

@Component({
  selector: 'app-test-dialog',
  templateUrl: './test-dialog.component.html',
  styleUrls: ['./test-dialog.component.css']
})
export class TestDialogComponent extends TableDialogComponent<DessertRow, TestDialogComponent> implements OnInit, ITableDialog {

  $key = new FormControl(null);
  name = new FormControl('', [Validators.required]);
  calories = new FormControl('', [Validators.required]);
  protein = new FormControl('');
  carbs = new FormControl('', [Validators.required]);
  fat = new FormControl('');
  gender = new FormControl('1');
  option = new FormControl(0);
  date = new FormControl('');
  isPermanent = new FormControl(false);

  form: FormGroup = new FormGroup({
    '$KEY': this.$key,
    'NAME': this.name,
    'CALORIES': this.calories,
    'PROTEIN': this.protein,
    'CARBS': this.carbs,
    'FAT': this.fat,
    'GENDER': this.gender,
    'OPTION': this.option,
    'DATE': this.date,
    'IS_PERMANENT': this.isPermanent
  });


  constructor(public dialogRef: MatDialogRef<TestDialogComponent>,
              iconRegistry: MatIconRegistry,
              @Inject(MAT_DIALOG_DATA) data) {
    super(dialogRef, data);
  }

  ngOnInit() {
    this.setFormGroup(this.form);
    if (!_.isNil(this.getDialogBuffer())) {
      this.setValueToForm(this.getDialogBuffer());
    }
  }


  setValueToForm(toUpdateObj: Dessert) {
    this.name.setValue(toUpdateObj.name);
    this.calories.setValue(toUpdateObj.calories);
    this.carbs.setValue(toUpdateObj.carbs);
    this.protein.setValue(toUpdateObj.protein);
    this.fat.setValue(toUpdateObj.fat);
  }

  getValueFromForm(): Dessert {
    const dessert = new Dessert(0, 0, 0, '', 0);
    dessert.name = this.name.value;
    dessert.calories = this.calories.value;
    dessert.carbs = this.carbs.value;
    dessert.protein = this.protein.value;
    dessert.fat = this.fat.value;
    return dessert;
  }

}
