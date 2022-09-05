import { NgModule } from '@angular/core';
import { ScheduleComponent } from './schedule/schedule.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ScheduleRoutingModule } from './schedule-routing.module';
import { ScheduleCalendarComponent } from './components/schedule-calendar/schedule-calendar.component';
import { ScheduleControlsComponent } from './components/schedule-controls/schedule-controls.component';
import { ScheduleDaysComponent } from './components/schedule-days/schedule-days.component';
import { ScheduleSectionComponent } from './components/schedule-section/schedule-section.component';
import { SharedModule } from '../shared-molude/shared.module';
import { ScheduleAssignComponent } from './components/schedule-assign/schedule-assign.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ScheduleRoutingModule,
    SharedModule
  ],
  declarations: [
    ScheduleComponent,
    ScheduleCalendarComponent,
    ScheduleControlsComponent,
    ScheduleDaysComponent,
    ScheduleSectionComponent,
    ScheduleAssignComponent
  ]
})
export class ScheduleModule {}
