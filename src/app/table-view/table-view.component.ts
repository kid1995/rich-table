import {Component, Input, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig, Sort} from '@angular/material';
import {ObjectUtils} from '../utils/object-utils';
import {BaseRichTableRow} from '../models/BaseRichTableRow';
import {ComponentType} from '@angular/cdk/portal';
import {TranslateService} from '@ngx-translate/core';
import {Observable} from 'rxjs/internal/Observable';
import {IRichTableModel} from '../models/IRichTableModel';
import * as _ from 'lodash';
import {CollectionUtils} from '../utils/collection-utils';

/**
 * @title Basic use of `<table mat-table>`
 */
function compare(a: BaseRichTableRow, b: BaseRichTableRow, isAsc: boolean, attr: string) {
  const valueA = ObjectUtils.getValueByAttrName(a.getBean(), attr);
  const valueB = ObjectUtils.getValueByAttrName(b.getBean(), attr);
  return (valueA < valueB ? -1 : 1);
}


function initDialog(): MatDialogConfig {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.width = '60%';
  return dialogConfig;
}

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.css']
})
export class TableViewComponent<T extends BaseRichTableRow, U> implements OnInit {

  @Input()
  dataSource: Array<T>;
  sortedRow: Array<T>;
  searchKey: string;
  isSelectedAll: boolean;

  toSearchAttr: Array<string>;
  componentRef: ComponentType<U>;
  features: { create: boolean, update: boolean, remove: boolean, duplicate: boolean } = {
    create: true,
    update: true,
    remove: true,
    duplicate: true
  };


  constructor(private dialog: MatDialog, private translateService: TranslateService) {
    this.toSearchAttr = this.getAttrsToSearch();
  }

  ngOnInit() {
    this.sortedRow = this.dataSource.slice();
  }

  // TODO: HANDEL ERROR AFTER CREATE
  onCreate() {
    const dialogConfig = initDialog();
    const dialogRef = this.dialog.open(this.componentRef, dialogConfig);
    dialogRef.afterClosed().subscribe(
      (data) => {
        if (!_.isNil(data)) {
          this.createObj(data).subscribe(
            (newElement) => {
              this.sortedRow.push(this.createNewRow(newElement));
            },
            (error) => {
              console.log(error);
            }
          );
        }
      }
    );
  }

  // TODO: HANDEL ERROR AFTER UPDATE
  onUpdate(element: T) {
    const dialogConfig = initDialog();
    dialogConfig.data = ObjectUtils.deepClone(element.getBean());
    const dialogRef = this.dialog.open(this.componentRef, dialogConfig);
    dialogRef.afterClosed().subscribe(
      (data) => {
        if (!_.isNil(data)) {
          const index = this.sortedRow.indexOf(element);
          this.updateObj(data).subscribe((updatedElement) => {
            element.setBean(updatedElement);
            this.sortedRow[index] = element;
          }, (error) => {
            console.log(error);
          });
        }
      }
    );
  }

  onDelete(element: T) {
    const index = CollectionUtils.findIndexOfElementById(this.sortedRow, element.getBean().id);
    this.deleteObj(index).subscribe(() => {
      if (index > -1) {
        this.sortedRow.splice(index, 1);
      }
    }, (error) => {
      console.log(error);
    });

  }

  onDuplicate(element: T) {
    const newElement = ObjectUtils.deepClone(element);
    this.sortedRow.push(newElement);
  }

  resetSearchKey() {
    this.searchKey = '';
  }

  sortData(sort: Sort) {
    const data = this.dataSource.slice();

    if (!sort.active || sort.direction === '') {
      this.sortedRow = data;
      return;
    }

    this.sortedRow = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      const compareType = typeof ObjectUtils.getValueByAttrName(a.getBean(), sort.active);
      let compareResutl = 0;
      switch (compareType) {
        case 'string':
          compareResutl = compare(a, b, isAsc, sort.active);
          break;
        case  'number':
          compareResutl = compare(a, b, isAsc, sort.active);
          break;
        default:
          if (_.isNil(this.sortForNonePrimitiveTyp(compareType))) {
            compareResutl = this.sortForNonePrimitiveTyp(compareType);
          }
          break;
      }
      return compareResutl * (isAsc ? 1 : -1);
    });
  }

  selectAll() {
    if (this.isSelectedAll) {
      this.sortedRow.forEach(e => e.selection = false);
      this.isSelectedAll = false;
    } else {
      this.sortedRow.forEach(e => e.selection = true);
      this.isSelectedAll = true;
    }
  }

  multipleDelete() {
    const sortedRowAfterDelete: Array<T> = [];
    this.sortedRow.forEach((e) => {
      console.log(e);
      if (!e.selection) {
        sortedRowAfterDelete.push(e);
      }
    });
    this.sortedRow = sortedRowAfterDelete.slice();
  }

  getHeaders(): Array<string> {
    return [];
  }

  getAttrsToSearch(): Array<string> {
    return [];
  }

  setDialog(componentRef: ComponentType<U>) {
    this.componentRef = componentRef;
  }

  setFeatures(create: boolean, update: boolean, remove: boolean, duplicate: boolean) {
    this.features.create = create;
    this.features.update = update;
    this.features.remove = remove;
    this.features.duplicate = duplicate;
  }

  /* All Methodes under this comment are used to Override*/
  createObj(data: IRichTableModel): Observable<IRichTableModel> {
    return;
  }

  updateObj(data: IRichTableModel): Observable<IRichTableModel> {
    return;
  }

  deleteObj(index: number): Observable<boolean> {
    return;
  }

  createNewRow(data: IRichTableModel): T {
    return;
  }

  sortForNonePrimitiveTyp(typ: string): number {
    return;
  }
}






