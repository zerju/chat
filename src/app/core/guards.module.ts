import {NgModule} from '@angular/core';
import {AuthGuard} from './guards/auth.guard';
import {NoAuthGuard} from './guards/no-auth.guard';

const GUARDS = [AuthGuard, NoAuthGuard];

@NgModule({providers: [GUARDS]})
export class CoreGuardsModule {
}
