import { NgModule } from '@angular/core';
import { MealsComponent } from './meals/meals.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MealsRoutingModule } from './meals-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MealsRoutingModule
  ],
  declarations: [
    MealsComponent
  ]
})
export class MealsModule {}
