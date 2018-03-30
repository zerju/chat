import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContainsPipe} from './contains.pipe';

const PIPES: any[] = [ContainsPipe];

@NgModule({imports: [CommonModule], declarations: [PIPES], exports: [PIPES]})
export class PipesModule {
}
