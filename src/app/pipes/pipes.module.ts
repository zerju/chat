import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {ContainsPipe} from './contains.pipe';
import {ImagePipe} from './image.pipe';

const PIPES: any[] = [ContainsPipe, ImagePipe];

@NgModule({
  imports: [CommonModule],
  declarations: [PIPES, ImagePipe],
  exports: [PIPES]
})
export class PipesModule {
}
