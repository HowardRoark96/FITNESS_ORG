import { BehaviorSubject, distinctUntilChanged, map, Observable } from 'rxjs';
import { User } from './modules/auth-module/shared-module/services/auth.service';
import { Meal } from './modules/health-module/shared-molude/services/meals.service';
import { Workout } from './modules/health-module/shared-molude/services/workouts.service';

export interface State {
  user: User | null,
  meals: Meal[] | null,
  workouts: Workout[] | null,
  [key: string]: any
}

const state: State = {
  user: null,
  meals: null,
  workouts: null
};

export class Store {
  private subject = new BehaviorSubject<State>(state);
  private store = this.subject.asObservable().pipe(distinctUntilChanged());

  get value() {
    return this.subject.value;
  }

  select<T>(name: string): Observable<T> {
    return this.store
      .pipe(
        map((item: State) => item[name])
      );
  }

  set(name: string, state: any) {
    this.subject.next({...this.value, [name]: state});
  }
}
