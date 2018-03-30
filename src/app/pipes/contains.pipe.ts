import {Pipe, PipeTransform} from '@angular/core';
import isNil from 'lodash/isNil';
import isObject from 'lodash/isObject';

@Pipe({name: 'contains'})
export class ContainsPipe implements PipeTransform {
  transform(array: any[], object: any): any {
    if (array !== undefined && array != null) {
      let i = array.length;
      while (i--) {
        if (isObject(object)) {
          if (array[i].id === object.id) {
            return true;
          }
        } else {
          if (array[i] === object) {
            return true;
          }
        }
      }
    }
    return false;
  }
}
