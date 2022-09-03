import { NgModule } from '@angular/core';
import { WorkoutsComponent } from './workouts.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { WorkoutsRoutingModule } from './workouts-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    WorkoutsRoutingModule
  ],
  declarations: [
    WorkoutsComponent
  ]
})
export class WorkoutsModule {}
