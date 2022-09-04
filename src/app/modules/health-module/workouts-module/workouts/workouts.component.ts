import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '../../../../store';
import { Workout, WorkoutsService } from '../../shared-molude/services/workouts.service';

@Component({
  selector: 'app-workouts-module',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.scss']
})
export class WorkoutsComponent implements OnInit, OnDestroy {
  workouts$: Observable<Workout[]>;
  subscription: Subscription;

  constructor(
    private workoutsService: WorkoutsService,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.subscription = this.workoutsService.workouts$.subscribe();
    this.workouts$ = this.store.select<Workout[]>('workouts');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  removeWorkout(event: Workout) {
    this.workoutsService.removeWorkout(event.$key).subscribe();
  }
}
