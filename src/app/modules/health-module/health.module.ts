import { NgModule } from '@angular/core';
import { HealthRoutingModule } from './health-routing.module';
import { SharedModule } from './shared-molude/shared.module';

@NgModule({
  imports: [
    HealthRoutingModule,
    SharedModule.forRoot()
  ],
  declarations: []
})
export class HealthModule {}
