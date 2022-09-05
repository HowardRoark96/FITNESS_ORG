import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, Subject, switchMap, tap, withLatestFrom } from 'rxjs';
import { Store } from '../../../../store';
import { Meal } from './meals.service';
import { Workout } from './workouts.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AuthService } from '../../../auth-module/shared-module/services/auth.service';

export interface ScheduleItem {
  meals: Meal[] | null,
  workouts: Workout[] | null,
  section: string,
  $key?: string | null,
  timestamp: number
}

export interface ScheduleList {
  morning?: ScheduleItem,
  lunch?: ScheduleItem,
  evening?: ScheduleItem,
  snacks?: ScheduleItem,
  [key: string]: any
}

@Injectable()
export class ScheduleService {
  private date$ = new BehaviorSubject<Date>(new Date());
  private section$ = new Subject();
  private itemList$ = new Subject();

  items$ = this.itemList$.pipe(
    withLatestFrom(this.section$),
    switchMap(([items, section]: any) => {
      const sectionId = section.data.$key;
      console.log(section.data);

      const defaults: ScheduleItem = {
        workouts: null,
        meals: null,
        section: section.section,
        timestamp: new Date(section.day).getTime()
      };

      const payload = {
        ...(sectionId ? section.data : defaults),
        ...items
      };

      if (sectionId) {
        delete payload.$key;

        return this.updateSection(sectionId, payload);
      }
      else
        return this.createSection(payload);
    })
  )

  selected$ = this.section$.pipe(
    tap(next => this.store.set('selected', next))
  );

  list$ = this.section$.pipe(
    map((value: any) => this.store.value[value.type]),
    tap(next => this.store.set('list', next))
  );

  schedule$: Observable<ScheduleList> = this.date$.pipe(
    tap(next => this.store.set('date', next)),
    map((day: Date) => {
      const startAt = new Date(day.getFullYear(), day.getMonth(), day.getDate())
        .getTime();
      const endAt = new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1)
        .getTime() - 1;

      return { startAt, endAt };
    }),
    switchMap((date: any) => {
      return this.getSchedule(date.startAt, date.endAt);
    }),
    map((data: any) => {
      const mapped: ScheduleList = {};

      for (const prop of data) {
        if (!mapped[prop.section]) {
          mapped[prop.section] = prop;
        }
       }

      return mapped;
    }),
    tap(next => this.store.set('schedule', next))
  );

  constructor(
    private store: Store,
    private authService: AuthService,
    private db: AngularFireDatabase
  ) {
  }

  updateDate(date: Date) {
    this.date$.next(date);
  }

  selectSection(section: any) {
    this.section$.next(section);
  }

  updateItems(items: any) {
    this.itemList$.next(items);
  }

  updateSection(key: string, data: ScheduleItem) {
    return this.authService.currentUser.pipe(
      map(user => user?.uid),
      switchMap(uid => this.db.object(`schedule/${uid}/${key}`).update(data))
    );
  }

  private createSection(data: ScheduleItem) {
    return this.authService.currentUser.pipe(
      map(user => user?.uid),
      switchMap(uid => this.db.list(`schedule/${uid}`).push(data))
    );
  }

  private getSchedule(startAt: number, endAt: number) {
    return this.authService.currentUser.pipe(
      map(user => user?.uid),
      switchMap(uid => (
          this.db.list(
            `schedule/${uid}`,
            ref => ref.orderByChild('timestamp').startAt(startAt).endAt(endAt)
          ).snapshotChanges()
        )
      ),
      map(actions => {
        return actions.map(a => {
          const key = a.payload.key;
          const data = a.payload.val();
          return ({...data as object, $key: key});
        })
      })
    );
  }
}
