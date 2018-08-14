import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatDialogModule} from '@angular/material';

import {ComponentsModule} from '../components/components.module';

import {WebsiteRoutingModule} from './website-routing.module';
import {WebsiteComponent} from './website.component';
import {MatSidenavModule} from '@angular/material/sidenav';

@NgModule({
  imports: [
    CommonModule,
    WebsiteRoutingModule,
    ComponentsModule,
    FlexLayoutModule,
    MatDialogModule,
    MatSidenavModule
  ],
  declarations: [WebsiteComponent]
})
export class WebsiteModule {
}
