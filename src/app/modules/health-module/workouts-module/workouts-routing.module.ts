import { RouterModule, Routes } from '@angular/router';
import { WorkoutsComponent } from './workouts/workouts.component';
import { NgModule } from '@angular/core';
import { WorkoutComponent } from './workout/workout.component';

const routes: Routes = [
  {
    path: '',
    component: WorkoutsComponent
  },
  {
    path: 'new',
    component: WorkoutComponent
  },
  {
    path: ':id',
    component: WorkoutComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class WorkoutsRoutingModule {}
