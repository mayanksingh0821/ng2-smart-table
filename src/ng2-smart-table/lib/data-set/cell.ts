import { AbstractControl } from '@angular/forms';
import { Column } from './column';
import { DataSet } from './data-set';
import { Row } from './row';

export class Cell {

  newValue: any = '';
  protected static PREPARE = (value: any) => value;

  constructor(protected value: any, protected row: Row, protected column: any, protected dataSet: DataSet) {
    this.newValue = value;
  }

  getColumn(): Column {
    return this.column;
  }

  getValidator(): AbstractControl {
    if(this.dataSet.getRowValidator(this.getRow().index))
    return this.dataSet.getRowValidator(this.getRow().index).controls[this.getId()];
  }

  getRow(): Row {
    return this.row;
  }

  getValue(): any {
    const valid = this.column.getValuePrepareFunction() instanceof Function;
    const prepare = valid ? this.column.getValuePrepareFunction() : Cell.PREPARE;
    return prepare.call(null, this.value, this.row.getData());
  }

  setValue(value: any): any {
    this.newValue = value;
  }

  getId(): string {
    return this.getColumn().id;
  }

  getTitle(): string {
    return this.getColumn().title;
  }

  isEditable(): boolean {
    if (this.getRow().index === -1) {
      return this.getColumn().isAddable;
    }
    else {
      return this.getColumn().isEditable;
    }
  }

}
