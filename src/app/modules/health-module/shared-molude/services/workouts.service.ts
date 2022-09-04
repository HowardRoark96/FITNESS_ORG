import { Injectable } from '@angular/core';
import { Store } from '../../../../store';
import { AngularFireDatabase, SnapshotAction } from '@angular/fire/compat/database';
import { AuthService, User } from '../../../auth-module/shared-module/services/auth.service';
import { filter, map, Observable, of, switchMap, tap } from 'rxjs';

export interface Workout {
  name: string,
  type: string,
  strength: any,
  endurance: any,
  timestamp: number,
  $key: string,
  $exists: () => string
}

@Injectable()
export class WorkoutsService {
  workouts$: Observable<any[]> = this.getWorkouts()
    .pipe(
      map(actions => {
        return actions.map(a => {
          const key = a.payload.key;
          const data = a.payload.val();
          return ({...data as object, $key: key});
        })
      }),
      tap(next => this.store.set('workouts', next))
    );

  private getWorkouts() {
    return this.authService.currentUser.pipe(
      map(user => user?.uid),
      switchMap(uid => this.db.list(`workouts/${uid}`).snapshotChanges())
    );
  }

  constructor(
    private store: Store,
    private db: AngularFireDatabase,
    private authService: AuthService
  ) {
  }

  getWorkout(key: string): Observable<Workout> {
    if (!key)
      return of({} as Workout);

    return this.store.select<Workout[]>('workouts').pipe(
      filter(workouts => !!workouts),
      map(workouts => workouts.find(workout => workout.$key === key) || {} as Workout)
    )
  }

  addWorkout(workout: Workout) {
    return this.authService.currentUser.pipe(
      map(user => user?.uid),
      switchMap(uid => this.db.list(`workouts/${uid}`).push(workout))
    );
  }

  updateWorkout(key: string, workout: Workout) {
    return this.authService.currentUser.pipe(
      map(user => user?.uid),
      switchMap(uid => this.db.object(`workouts/${uid}/${key}`).update(workout))
    );
  }

  removeWorkout(key: string) {
    return this.authService.currentUser.pipe(
      map(user => user?.uid),
      switchMap(uid => this.db.list(`workouts/${uid}`).remove(key))
    );
  }
}
