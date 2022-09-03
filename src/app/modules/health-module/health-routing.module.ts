import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'schedule',
    loadChildren: () => import('./schedule-module/schedule.module').then(m => m.ScheduleModule)
  },
  {
    path: 'meals',
    loadChildren: () => import('./meals-module/meals.module').then(m => m.MealsModule)
  },
  {
    path: 'workouts',
    loadChildren: () => import('./workouts-module/workouts.module').then(m => m.WorkoutsModule)
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
export class HealthRoutingModule {}
