import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {ClickOutsideDirective} from './click-outside.directive';
import {FocusDirective} from './focus.directive';

const DIRECTIVES: any[] = [FocusDirective, ClickOutsideDirective];

@NgModule(
    {imports: [CommonModule], declarations: DIRECTIVES, exports: DIRECTIVES})
export class DirectivesModule {
}
