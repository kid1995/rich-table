import { Pipe, PipeTransform } from '@angular/core';
import {BaseRichTableRow} from '../models/BaseRichTableRow';
import * as _ from 'lodash';

@Pipe({
  name: 'richtTableSearch'
})
export class RichtTableSearchPipe implements PipeTransform {

  transform(items: BaseRichTableRow [], searchText: string, properties: string []): any {
    if ( !_.isNil(searchText) && searchText !== '') {
      return _.filter(items,
        it => this.checkString(it.getBean(), searchText.trim().toLowerCase(), properties)
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
