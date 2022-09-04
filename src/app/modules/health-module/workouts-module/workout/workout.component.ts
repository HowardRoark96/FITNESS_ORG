import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Observable, Subscription, switchMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Workout, WorkoutsService } from '../../shared-molude/services/workouts.service';

@Component({
  selector: 'app-workout-module',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.scss']
})
export class WorkoutComponent implements OnInit, OnDestroy {
  workout$: Observable<Workout>;
  subscription: Subscription;

  constructor(
    private workoutsService: WorkoutsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.subscription = this.workoutsService.workouts$.subscribe();
    this.workout$ =
      this.activatedRoute.params
        .pipe(
          map(params => params['id']),
          switchMap(id => this.workoutsService.getWorkout(id))
        );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  async addWorkout(event: Workout) {
    await this.workoutsService.addWorkout(event).subscribe();

    this.router.navigate(['workouts']);
  }

  async updateWorkout(event: Workout) {
    const key = this.activatedRoute.snapshot.params['id'];

    await this.workoutsService.updateWorkout(key, event).subscribe();

    this.router.navigate(['workouts']);
  }

  async removeWorkout(event: Workout) {
    const key = this.activatedRoute.snapshot.params['id'];

    await this.workoutsService.removeWorkout(key).subscribe();

    this.router.navigate(['workouts']);
  }
}
