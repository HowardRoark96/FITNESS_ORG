import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoutingModule } from './modules/auth-module/auth-routing.module';
import { HealthRoutingModule } from './modules/health-module/health-routing.module';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'schedule'
  }
];

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
