import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ScheduleItem, ScheduleList, ScheduleService } from '../../shared-molude/services/schedule.service';
import { Store } from '../../../../store';
import { Workout, WorkoutsService } from '../../shared-molude/services/workouts.service';
import { Meal, MealsService } from '../../shared-molude/services/meals.service';

@Component({
  selector: 'app-schedule-module',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleComponent implements OnInit, OnDestroy {
  date$: Observable<Date>;
  selected$: Observable<any>;
  list$: Observable<Meal[] | Workout[]>;
  schedule$: Observable<ScheduleList>;
  subscriptions: Subscription[];

  open = false;

  constructor(
    private mealsService: MealsService,
    private workoutsService: WorkoutsService,
    private scheduleService: ScheduleService,
    private store: Store
  ) { }

  ngOnInit() {
    this.date$ = this.store.select<Date>('date');
    this.selected$ = this.store.select<any>('selected');
    this.schedule$ = this.store.select<ScheduleItem[]>('schedule');
    this.list$ = this.store.select<Meal[] | Workout[]>('list');

    this.subscriptions = [
      this.scheduleService.schedule$.subscribe(),
      this.scheduleService.selected$.subscribe(),
      this.scheduleService.list$.subscribe(),
      this.scheduleService.items$.subscribe(),
      this.mealsService.meals$.subscribe(),
      this.workoutsService.workouts$.subscribe()
    ]
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  changeDate(date: Date) {
    this.scheduleService.updateDate(date);
  }

  changeSection(data: any) {
    this.open = true;
    this.scheduleService.selectSection(data);
  }

  assignItem(event: any) {
    this.scheduleService.updateItems(event);
    this.closeAssign();
  }

  closeAssign() {
    this.open = false;
  }
}
