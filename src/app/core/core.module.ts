import {NgModule} from '@angular/core';

import {CoreGuardsModule} from './guards.module';
import {CoreServicesModule} from './services.module';
import {CoreStateModule} from './state.module';

const MODULES = [CoreServicesModule, CoreGuardsModule, CoreStateModule];

@NgModule({imports: [MODULES], exports: [MODULES]})
export class CoreModule {
}
