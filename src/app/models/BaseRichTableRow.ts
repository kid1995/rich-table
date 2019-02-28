import {IRichTableModel} from './IRichTableModel';

export abstract class BaseRichTableRow {

  bean: IRichTableModel;
  selection: boolean;


  getValue(attribute: string): string {
    if (this.getOverridenAttrs().indexOf(attribute) === -1) {
      const indexOfAttr = Object.keys(this.getBean()).indexOf(attribute);
      return Object.values(this.getBean())[indexOfAttr];
    } else {
      return this.getOverridenAttrValue(attribute);
    }
  }

  getValues(attrs: Array<string>): Array<string> {
    let values = new Array<string>();
    for (let i = 0; i < attrs.length; i++) {
      values.push(this.getValue(attrs[i]));
    }
    return values;
  }

  setBean(bean: IRichTableModel) {
    this.bean = bean;
  }

  getBean(): IRichTableModel {
    return this.bean;
  }

  abstract getOverridenAttrs(): Array<string>;

  abstract getOverridenAttrValue(attribute: string);
}
