import {Pipe, PipeTransform} from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'searchByChooseValue'
})
export class SearchByChooseValuePipe implements PipeTransform {

  transform(items: any [], searchText: string, properties: string []): any {
    if ( !_.isNil(searchText) && searchText !== '') {
      return _.filter(items,
        it => this.checkString(it, searchText.trim().toLowerCase(), properties)
      );
    }
    return items;
  }

  checkString(object: any, searchText: string, properties: string []): any {
    for (let i = 0; i < properties.length; i++) {
      const indexOfProperty = Object.keys(object).indexOf(properties[i]);
      const value = Object.values(object)[indexOfProperty];
      if (value.toString().trim().toLowerCase().includes(searchText)) {
        return object;
      }
    }
  }
}


