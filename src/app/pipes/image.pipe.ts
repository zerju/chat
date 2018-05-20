import {HttpClient} from '@angular/common/http';
import {Pipe, PipeTransform} from '@angular/core';

import {environment} from '../../environments/environment.prod';

const imagesUrl = environment.apiURL + '/images/';

@Pipe({name: 'image'})
export class ImagePipe implements PipeTransform {
  constructor(private _http: HttpClient) {}

  transform(value: any, args?: any): any {
    return imagesUrl + value;
  }
}
