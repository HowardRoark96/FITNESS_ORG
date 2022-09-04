import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Workout } from '../../../shared-molude/services/workouts.service';

@Component({
  selector: 'app-workout-form',
  templateUrl: './workout-form.component.html',
  styleUrls: ['./workout-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkoutFormComponent implements OnChanges {
  @Output() workoutCreated = new EventEmitter<Workout>();
  @Output() workoutUpdated = new EventEmitter<Workout>();
  @Output() workoutRemoved = new EventEmitter<Workout>();
  @Input() workout: Workout;

  form = this.fb.group({
    name: ['', [Validators.required]],
    type: ['strength', [Validators.required]],
    strength: this.fb.group({
      reps: 0,
      sets: 0,
      weight: 0
    }),
    endurance: this.fb.group({
      distance: 0,
      duration: 0
    }),
  });

  toggled = false;
  exists = false;


  get required() {
    return (
      this.form.get('name')?.hasError('required')
      && this.form.get('name')?.touched
    );
  }

  get placeholder() {
    return `e.g. ${this.form.get('type')?.value === 'strength' ? 'Push ups' : 'Running'}`;
  }

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (this.workout && this.workout.name) {
      this.exists = true;

      const value = this.workout;

      this.form.patchValue(value);
    }
  }

  createWorkout() {
    if (this.form.valid)
      this.workoutCreated.emit(this.form.value as Workout);
  }

  updateWorkout() {
    if (this.form.valid)
      this.workoutUpdated.emit(this.form.value as Workout);
  }

  removeWorkout() {
    this.workoutRemoved.emit(this.form.value as Workout);
  }

  toggle() {
    this.toggled = !this.toggled;
  }
}
