import { RouterModule, Routes } from '@angular/router';
import { MealsComponent } from './meals/meals.component';
import { NgModule } from '@angular/core';
import { MealComponent } from './meal/meal.component';

const routes: Routes = [
  {
    path: '',
    component: MealsComponent
  },
  {
    path: 'new',
    component: MealComponent
  },
  {
    path: ':id',
    component: MealComponent
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
export class MealsRoutingModule {}
