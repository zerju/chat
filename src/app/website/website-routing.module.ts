import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {WebsiteComponent} from './website.component';

const routes: Routes = [
  {path: '', pathMatch: 'full',component: WebsiteComponent},
  {path: 'c/:id', component: WebsiteComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: []
})
export class WebsiteRoutingModule {
}
