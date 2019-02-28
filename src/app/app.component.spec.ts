import {TestBed, async} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {TestTableViewComponent} from './table-view/test-table-view.component';
import {MaterialModule} from './material/material.module';
import {MatIconRegistry} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {TranslateModule, TranslateService, TranslateStore} from '@ngx-translate/core';
import {RichtTableSearchPipe} from './pipes/richt-table-search.pipe';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        TestTableViewComponent,
        RichtTableSearchPipe
      ], imports: [MaterialModule,
        FormsModule,
        TranslateModule.forRoot()],
      providers: [MatIconRegistry]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
