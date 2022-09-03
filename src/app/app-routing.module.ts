import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { HealthRoutingModule } from './health/health-routing.module';

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AuthRoutingModule,
    HealthRoutingModule
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
