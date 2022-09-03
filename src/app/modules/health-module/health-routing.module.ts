import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth-module/shared-module/guards/auth.guard';

const routes: Routes = [
  {
    path: 'schedule',
    canActivate: [AuthGuard],
    loadChildren: () => import('./schedule-module/schedule.module').then(m => m.ScheduleModule)
  },
  {
    path: 'meals',
    canActivate: [AuthGuard],
    loadChildren: () => import('./meals-module/meals.module').then(m => m.MealsModule)
  },
  {
    path: 'workouts',
    canActivate: [AuthGuard],
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
