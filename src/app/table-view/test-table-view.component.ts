import {Component, Input} from '@angular/core';
import {TableViewComponent} from './table-view.component';
import {Dessert} from './test-model/Dessert';
import {MatDialog} from '@angular/material';
import {DessertRow} from './test-model/DessertRow';
import {TestDialogComponent} from '../table-dialog/test-dialog/test-dialog.component';
import {TranslateService} from '@ngx-translate/core';
import {Observable} from 'rxjs/internal/Observable';
import {of} from 'rxjs/internal/observable/of';

@Component({
  selector: 'app-test-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.css']
})
export class TestTableViewComponent extends TableViewComponent<DessertRow, TestDialogComponent> {

  @Input()
  dataSource: DessertRow[];

  constructor(dialog: MatDialog, translateService: TranslateService) {
    super(dialog, translateService);
    this.setDialog(TestDialogComponent);
    this.setFeatures(true, true, true, true);
  }

  getHeaders(): Array<string> {
    return ['name', 'calories', 'fat', 'carbs', 'id'];
  }

  getAttrsToSearch(): Array<string> {
    return ['name'];
  }

  createObj(data: Dessert): Observable<Dessert> {
    const newElement = new Dessert(data.calories, data.carbs, data.fat, data.name, data.protein);
    /* write dao create function here*/
    return of(newElement);
  }

  updateObj(data: Dessert): Observable<Dessert> {
    /* write dao update function here*/
    return of(data);
  }
  deleteObj(index: number): Observable<boolean>{
      return of(true);
  }
  createNewRow( data: Dessert): DessertRow {
    return new DessertRow(data);
  }

}
