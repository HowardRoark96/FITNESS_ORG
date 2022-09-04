import { Injectable } from '@angular/core';
import { Store } from '../../../../store';
import { AngularFireDatabase, SnapshotAction } from '@angular/fire/compat/database';
import { AuthService, User } from '../../../auth-module/shared-module/services/auth.service';
import { filter, map, Observable, of, switchMap, tap } from 'rxjs';

export interface Meal {
  name: string,
  ingredients: string[],
  timestamp: number,
  $key: string,
  $exists: () => string
}

@Injectable()
export class MealsService {
  meals$: Observable<any[]> = this.getMeals()
    .pipe(
      map(actions => {
        return actions.map(a => {
          const key = a.payload.key;
          const data = a.payload.val();
          return ({...data as object, $key: key});
        })
      }),
      tap(next => this.store.set('meals', next))
    );

  private getMeals() {
    return this.authService.currentUser.pipe(
      map(user => user?.uid),
      switchMap(uid => this.db.list(`meals/${uid}`).snapshotChanges())
    );
  }

  constructor(
    private store: Store,
    private db: AngularFireDatabase,
    private authService: AuthService
  ) {
  }

  getMeal(key: string): Observable<Meal> {
    if (!key)
      return of({} as Meal);

    return this.store.select<Meal[]>('meals').pipe(
      filter(meals => !!meals),
      map(meals => meals.find(meal => meal.$key === key) || {} as Meal)
    )
  }

  addMeal(meal: Meal) {
    return this.authService.currentUser.pipe(
      map(user => user?.uid),
      switchMap(uid => this.db.list(`meals/${uid}`).push(meal))
    );
  }

  updateMeal(key: string, meal: Meal) {
    return this.authService.currentUser.pipe(
      map(user => user?.uid),
      switchMap(uid => this.db.object(`meals/${uid}/${key}`).update(meal))
    );
  }

  removeMeal(key: string) {
    return this.authService.currentUser.pipe(
      map(user => user?.uid),
      switchMap(uid => this.db.list(`meals/${uid}`).remove(key))
    );
  }
}
