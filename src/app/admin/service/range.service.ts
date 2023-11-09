import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { DateRange } from '../interfaces/range';

@Injectable({
  providedIn: 'root'
})
export class RangeService {
  private subject: Subject<DateRange>;
  private Behaviorsub: BehaviorSubject<DateRange>;

  constructor() {
    let startDate = new Date();
    startDate.setDate(startDate.getDate() - 15);
    let range = { start: startDate, end: new Date() } as DateRange;
    this.subject = new Subject<DateRange>();
    this.Behaviorsub = new BehaviorSubject(range);
  }

  rangeEmit() {
    return this.Behaviorsub.asObservable();
  }

  nextState(range: DateRange) {
    this.Behaviorsub.next(range);
  }
}
