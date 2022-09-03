import { NgModule } from '@angular/core';
import { ScheduleComponent } from './schedule.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ScheduleRoutingModule } from './schedule-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ScheduleRoutingModule
  ],
  declarations: [
    ScheduleComponent
  ]
})
export class ScheduleModule {}
