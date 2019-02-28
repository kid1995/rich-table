import {BaseRichTableRow} from '../../models/BaseRichTableRow';
import {Dessert} from './Dessert';

export class DessertRow extends BaseRichTableRow {

  constructor(dessert: Dessert) {
    super();
    this.setBean(dessert);
  }

  getOverridenAttrs(): Array<string> {
    return ['subObj'];
  }

  getOverridenAttrValue(attribute: string) {
    switch (attribute) {
      case 'subObj':
        return this.getSubObjValue(<Dessert>this.getBean());
    }
  }

  getSubObjValue(dessert: Dessert): string {
    return dessert.subObj.name + ':' + dessert.subObj.value ;
  }
}
