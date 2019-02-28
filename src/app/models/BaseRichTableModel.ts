import {GeneratorUtils} from '../utils/generator-utils';
import {IRichTableModel} from './IRichTableModel';

export class BaseRichTableModel implements  IRichTableModel{

  createdDate: number;
  id: number;


  constructor() {
    this.createdDate = GeneratorUtils.getCreatedDate();
    this.id = GeneratorUtils.generateID(this.createdDate);
  }

}
