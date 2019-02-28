import * as _ from 'lodash';
import {BaseRichTableRow} from '../models/BaseRichTableRow';

export class CollectionUtils {
  public static findIndexOfElementById(array: Array<BaseRichTableRow>, id: number): number {
    return _.findIndex(array, item => item.getBean().id === id);
  }
}
