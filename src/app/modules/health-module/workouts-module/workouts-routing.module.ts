import { RouterModule, Routes } from '@angular/router';
import { WorkoutsComponent } from './workouts/workouts.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: WorkoutsComponent
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
