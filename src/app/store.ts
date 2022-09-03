import { BehaviorSubject, distinctUntilChanged, map, Observable } from 'rxjs';
import { User } from './modules/auth-module/shared-module/services/auth.service';

export interface State {
  user: User | null,
  [key: string]: any
}

const state: State = {
  user: null,
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
