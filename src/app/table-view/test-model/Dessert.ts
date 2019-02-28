import {BaseRichTableModel} from '../../models/BaseRichTableModel';
import {IRichTableModel} from '../../models/IRichTableModel';

export interface SubObject {
  name: string;
  value: number;
}


export class Dessert extends BaseRichTableModel implements IRichTableModel {
  calories: number;
  carbs: number;
  fat: number;
  name: string;
  protein: number;
  subObj: SubObject;


  constructor(calories: number, carbs: number, fat: number, name: string, protein: number) {
    super();
    this.calories = calories;
    this.carbs = carbs;
    this.fat = fat;
    this.name = name;
    this.protein = protein;
    this.subObj = {name: 'test', value: 10};
  }
}
