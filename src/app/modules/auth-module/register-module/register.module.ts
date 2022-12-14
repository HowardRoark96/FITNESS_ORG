import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { RegisterRoutingModule } from './register-routing.module';
import { SharedModule } from '../shared-module/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RegisterRoutingModule,
    SharedModule
  ],
  declarations: [
    RegisterComponent
  ],
  providers: []
})
export class RegisterModule { }
