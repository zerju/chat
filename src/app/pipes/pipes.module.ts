import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {ContainsPipe} from './contains.pipe';
import {ImagePipe} from './image.pipe';
import {MyMessagePipe} from './my-message.pipe';

const PIPES: any[] = [ContainsPipe, ImagePipe, MyMessagePipe];

@NgModule({imports: [CommonModule], declarations: [PIPES], exports: [PIPES]})
export class PipesModule {
}
