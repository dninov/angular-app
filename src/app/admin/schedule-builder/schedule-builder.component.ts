import { Component, AfterViewInit, OnInit, ElementRef } from '@angular/core';
import { FullCalendarComponent, CalendarOptions } from '@fullcalendar/angular';
import interactionPlugin from '@fullcalendar/interaction';
import { ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../admin.service';
import bgLocale from '@fullcalendar/core/locales/bg';

@Component({
  selector: 'app-schedule-builder',
  templateUrl: './schedule-builder.component.html',
  styleUrls: ['./schedule-builder.component.css']
})
export class ScheduleBuilderComponent  implements OnInit{
  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;
  render: boolean = false;
  id:any;
  first:boolean=true;
  second:boolean=false;
  third:boolean=false;
  checked = false;
  eventsArr:Array<any>=[];
  loading:boolean = true;

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [interactionPlugin],
    eventOrder: "-true",
    editable: true,
    locale: "bg",
    weekNumberCalculation: 'ISO',
    weekends: true,
    eventClick: this.eventClick.bind(this),
    dateClick: this.eventClick.bind(this), 
    events: this.eventsArr
  };
  constructor(
    private readonly route: ActivatedRoute,
    private adminService: AdminService,
    private router: Router,
  ) { }

  ngOnInit(){
    
    this.id = this.route.snapshot.paramMap.get("uid");
    this.adminService.getUserSchedule(this.id).then((result:any)=>{
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

  eventClick(event:any){
    let calendarApi = this.calendarComponent.getApi();
    let eventExist = false;
    let datePicked = "";
    let eventObj= {};
    if(event.date!== undefined){
      datePicked = event.dateStr;
    }else if(event.event._instance.range.start !== undefined){
      datePicked = event.event._instance.range.start.toISOString().slice(0, -14);
    }else{
      return
    }
    if(this.first){
      eventObj = {textColor:'#20232A', color: '#F0F0F0', title:'Първа', date:datePicked};
    }else if(this.second){
      eventObj = {textColor:'#20232A', color: '#FFD740', title:'Втора', date:datePicked};
    }else{
      eventObj = {color: '#673AB7', title:'Нощна', date:datePicked};
    }
    for (let i = 0; i < this.eventsArr.length; i++) {
      if(this.eventsArr[i].date === datePicked){
        eventExist = true;
      }
    }
    if(eventExist && this.checked === false){
      calendarApi.removeAllEvents();
      this.eventsArr = this.eventsArr.filter(e=> e.date !== datePicked);
      this.eventsArr.forEach(event => {
        calendarApi.addEvent(event);
      });
    }else{
      this.eventsArr.push(eventObj);
      calendarApi.addEvent(eventObj);
    }
  }

  setOptions(){
    this.calendarOptions = {
      initialView: 'dayGridMonth',
      weekends: true,
      dateClick: this.eventClick.bind(this), // bind is important!
      events: this.eventsArr
    }
  }

  firstActive(){
    this.first = true;
    this.second = false;
    this.third = false;
  }
  secondActive(){
    this.first = false;
    this.second = true;
    this.third = false;
  }
  thirdActive(){
    this.first = false;
    this.second = false;
    this.third = true;
  }
  saveSchedule(){
    this.loading = true;
    this.adminService.updateUserSchedule(this.eventsArr, this.id).then(()=>{
      this.loading = false;
    }).catch(error=>console.log(error));
  }
  back(){
    this.router.navigate(['admin-dashboard']);
  }
}