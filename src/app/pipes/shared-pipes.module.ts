import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchByChooseValuePipe } from './search-by-choose-value.pipe';
import { RichtTableSearchPipe } from './richt-table-search.pipe';


@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [ SearchByChooseValuePipe, RichtTableSearchPipe],
    exports: [SearchByChooseValuePipe, RichtTableSearchPipe]
})
export class SharedPipesModule { }
