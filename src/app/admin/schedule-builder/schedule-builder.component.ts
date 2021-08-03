import { Component, AfterViewInit, OnInit, ElementRef } from '@angular/core';
import { CalendarOptions, Calendar } from '@fullcalendar/angular'; // useful for typechecking
import interactionPlugin from '@fullcalendar/interaction';
import { ViewChild } from '@angular/core';
@Component({
  selector: 'app-schedule-builder',
  templateUrl: './schedule-builder.component.html',
  styleUrls: ['./schedule-builder.component.css']
})
export class ScheduleBuilderComponent  implements AfterViewInit, OnInit{
  @ViewChild('calendar') fullcalendar!: Calendar;
  render: boolean = false;
  
  eventsArr:Array<object>=[{ title: 'event 1', date: '2021-08-01' },
  { title: 'event 2', date: '2021-08-02' }];

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [interactionPlugin],
    editable: true,
    weekends: true,
    dateClick: this.eventClick.bind(this), // bind is important!
    events: this.eventsArr
  };
  constructor(
  
  ) { }
  ngOnInit(){
    
  }
 

  eventClick(event:any){
    if(event.date!==undefined){
      const eventObj = {title:'Hui', date: event.dateStr};
      this.eventsArr.push(eventObj);
      this.calendarOptions.events = this.eventsArr;
      console.log(this.calendarOptions.events);
      this.fullcalendar.addEvent(eventObj)
    }
  }
  setOptions(){
    this.calendarOptions = {
      initialView: 'dayGridMonth',
      weekends: true,
      dateClick: this.eventClick.bind(this), // bind is important!
      events: this.eventsArr
    }
    console.log(this.eventsArr);
  }

  toggleWeekends() {
    this.calendarOptions.weekends = !this.calendarOptions.weekends 
     }





  ngAfterViewInit(){
    this.render = true;
    
  }
}