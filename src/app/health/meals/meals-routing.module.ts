import { RouterModule, Routes } from '@angular/router';
import { MealsComponent } from './meals.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: MealsComponent
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
