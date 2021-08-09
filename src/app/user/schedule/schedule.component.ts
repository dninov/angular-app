import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FullCalendarComponent, CalendarOptions } from '@fullcalendar/angular';
import { UserService } from '../user.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  @ViewChild('calendar') calendarComponent!: FullCalendarComponent; 
  render: boolean = false;
  eventsArr:Array<any>=[];
  loading:boolean = true;
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    eventOrder: "-true",
    locale: "bg",
    weekNumberCalculation: 'ISO',
    weekends: true,
    events: this.eventsArr
  };
  constructor(
    private readonly route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.userService.getSchedule().then((result:any)=>{
      this.loading = false;
      if(result.data()){
          let resultObj = result.data();
          this.eventsArr = resultObj.schedule;
          let calendarApi = this.calendarComponent.getApi();
          this.eventsArr.forEach(event => {
            calendarApi.addEvent(event);
          });
        }else{
          return
        }
      }).catch(error=>console.log(error))
    setTimeout(()=>this.renderCalendar(), 100);
  }
  renderCalendar(){
    this.render = true;
  }

}
