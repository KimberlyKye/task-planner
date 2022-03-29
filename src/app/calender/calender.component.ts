import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { DateService } from '../shared/date.service';

interface Day {
  value: moment.Moment;
  active: boolean;
  disabled: boolean;
  selected: boolean;
}

interface Week {
  days: Day[];
}

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})
export class CalenderComponent implements OnInit {

  calender!: Week[];

  constructor(private dateService: DateService) { }

  ngOnInit() {
    this.dateService.date.subscribe(this.generate.bind(this))
  }

  generate(now: moment.Moment) {
    const startDay = now.clone().startOf('month').startOf('isoWeek');
    const endDay = now.clone().endOf('month').endOf('isoWeek');
  
    const date = startDay.clone().subtract(1,'day');

    const calender = [];

    while (date.isBefore(endDay, 'day')) {
      calender.push({
        days: Array(7)
          .fill(0)
          .map( () => {
            const value = date.add(1, 'day').clone();
            const active = moment().isSame(value, 'date');
            const disabled = !now.isSame(value, 'month');
            const selected = now.isSame(value, 'date');

            return {
              value, active, disabled, selected
            }
          })
      })
    }

    this.calender = calender;
  }

  select(day: moment.Moment) {
    this.dateService.changeDate(day);
  }

}
