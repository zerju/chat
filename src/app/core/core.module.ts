import { NgModule } from '@angular/core';

import { CoreEffectsModule } from './effects.module';
import { CoreGuardsModule } from './guards.module';
import { CoreReducersModule } from './reducers.module';
import { CoreServicesModule } from './services.module';

const MODULES = [
  CoreServicesModule, CoreReducersModule, CoreEffectsModule,
  CoreGuardsModule
];

@NgModule({ imports: [MODULES], exports: [MODULES] })
export class CoreModule {

}
