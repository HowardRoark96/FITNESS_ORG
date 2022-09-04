import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { Meal } from '../../../shared-molude/services/meals.service';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-meal-form',
  templateUrl: './meal-form.component.html',
  styleUrls: ['./meal-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MealFormComponent implements OnChanges {
  @Output() mealCreated: EventEmitter<Meal> = new EventEmitter<Meal>();
  @Output() mealUpdated: EventEmitter<Meal> = new EventEmitter<Meal>();
  @Output() mealRemoved: EventEmitter<Meal> = new EventEmitter<Meal>();
  @Input() meal: Meal;

  form = this.fb.group({
    name: ['', [Validators.required]],
    ingredients: this.fb.array([''])
  });

  toggled = false;
  exists = false;

  get ingredients() {
    return this.form.get('ingredients') as FormArray;
  }

  get required() {
    return (
      this.form.get('name')?.hasError('required')
      && this.form.get('name')?.touched
    );
  }

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (this.meal && this.meal.name) {
      this.exists = true;
      this.emptyIngredients();

      const value = this.meal;

      this.form.patchValue(value);

      if (value.ingredients) {
        for (const item of value.ingredients) {
          this.ingredients.push(new FormControl(item));
        }
      }
    }
  }

  emptyIngredients() {
    while(this.ingredients.controls.length) {
      this.ingredients.removeAt(0);
    }
  }

  createMeal() {
    if (this.form.valid)
      this.mealCreated.emit(this.form.value as Meal);
  }

  updateMeal() {
    if (this.form.valid)
      this.mealUpdated.emit(this.form.value as Meal);
  }

  removeMeal() {
    this.mealRemoved.emit(this.form.value as Meal);
  }

  addIngredient() {
    this.ingredients.push(new FormControl(''));
  }

  removeIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  toggle() {
    this.toggled = !this.toggled;
  }
}
