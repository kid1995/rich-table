import {Component} from '@angular/core';
import {Dessert} from './table-view/test-model/Dessert';
import {DessertRow} from './table-view/test-model/DessertRow';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private translateService: TranslateService) {
    this.translateService.setDefaultLang('de');
    this.translateService.use('de');
  }


  desserts: DessertRow[] = [
    new DessertRow(new Dessert(159, 30, 6, 'Frozen yogurt', 3)),
    new DessertRow(new Dessert(158, 37, 2, 'Hot yogurt', 6)),
    new DessertRow(new Dessert(157, 21, 6, 'Warm yogurt', 1)),
    new DessertRow(new Dessert(156, 22, 3, 'Normal yogurt', 4)),
    new DessertRow(new Dessert(155, 43, 5, 'Yolo yogurt', 2)),
  ];
}
