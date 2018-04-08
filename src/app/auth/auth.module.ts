import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthRoutingModule } from './auth-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule, AuthRoutingModule, FlexLayoutModule, ReactiveFormsModule, FormsModule
  ],
  declarations: [LoginComponent, RegisterComponent]
})
export class AuthModule { }
