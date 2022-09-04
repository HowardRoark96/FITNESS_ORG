import { NgModule } from '@angular/core';
import { MealsComponent } from './meals/meals.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MealsRoutingModule } from './meals-routing.module';
import { SharedModule } from '../shared-molude/shared.module';
import { MealComponent } from './meal/meal.component';
import { MealFormComponent } from './components/meal-form/meal-form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MealsRoutingModule,
    SharedModule
  ],
  declarations: [
    MealsComponent,
    MealComponent,
    MealFormComponent
  ]
})
export class MealsModule {}
