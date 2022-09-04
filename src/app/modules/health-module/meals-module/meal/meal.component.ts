import { Component, OnDestroy, OnInit } from '@angular/core';
import { Meal, MealsService } from '../../shared-molude/services/meals.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, Subscription, switchMap } from 'rxjs';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss']
})
export class MealComponent implements OnInit, OnDestroy {
  meal$: Observable<Meal>;
  subscription: Subscription;

  constructor(
    private mealsService: MealsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.subscription = this.mealsService.meals$.subscribe();
    this.meal$ =
      this.activatedRoute.params
        .pipe(
          map(params => params['id']),
          switchMap(id => this.mealsService.getMeal(id))
        );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  async addMeal(event: Meal) {
    await this.mealsService.addMeal(event).subscribe();

    this.router.navigate(['meals']);
  }

  async updateMeal(event: Meal) {
    const key = this.activatedRoute.snapshot.params['id'];

    await this.mealsService.updateMeal(key, event).subscribe();

    this.router.navigate(['meals']);
  }

  async removeMeal(event: Meal) {
    const key = this.activatedRoute.snapshot.params['id'];

    await this.mealsService.removeMeal(key).subscribe();

    this.router.navigate(['meals']);
  }
}
