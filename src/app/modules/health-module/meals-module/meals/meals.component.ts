import { Component, OnDestroy, OnInit } from '@angular/core';
import { Meal, MealsService } from '../../shared-molude/services/meals.service';
import { Observable, Subscription } from 'rxjs';
import { Store } from '../../../../store';

@Component({
  selector: 'app-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.scss']
})
export class MealsComponent implements OnInit, OnDestroy{
  meals$: Observable<Meal[]>;
  subscription: Subscription;

  constructor(
    private mealsService: MealsService,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.subscription = this.mealsService.meals$.subscribe();
    this.meals$ = this.store.select<Meal[]>('meals');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  removeMeal(event: Meal) {
    this.mealsService.removeMeal(event.$key).subscribe();
  }
}
