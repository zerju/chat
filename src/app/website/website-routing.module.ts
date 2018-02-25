import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {WebsiteComponent} from './website.component';

const routes: Routes = [{component: WebsiteComponent, path: ''}];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: []
})
export class WebsiteRoutingModule {}
