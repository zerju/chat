import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {component: LoginComponent, path: 'login'},
  {component: RegisterComponent, path: 'register'}
];

@NgModule({
  imports: [
    CommonModule, RouterModule.forChild(routes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
