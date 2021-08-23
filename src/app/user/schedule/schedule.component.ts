import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FullCalendarComponent, CalendarOptions } from '@fullcalendar/angular';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { State } from 'src/app/app.reducer';
import { AuthService } from 'src/app/auth/auth.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit, OnDestroy {
  @ViewChild('calendar') calendarComponent!: FullCalendarComponent; 
  render: boolean = false;
  eventsArr:Array<any>=[];
  loading:boolean = true;
  user$!: Observable<any>;
  userSub!: Subscription;
  user!: any;
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    eventOrder: "-true",
    locale: "bg",
    weekNumberCalculation: 'ISO',
    weekends: true,
    events: this.eventsArr
  };
  constructor(
    private userService: UserService,
    private store: Store<State>,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.user$ = this.store.select(store=> store.auth.user);
    this.userSub = this.user$.subscribe((userData:any)=>{
      this.user = userData;
      if(Object.keys(userData).length === 0){
          console.log('Profile no User');
          this.authService.reloadSub();
      }else{
          this.loading = false;
          this.userService.getSchedule(this.user.uid).then((result:any)=>{
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
    })
  }
  renderCalendar(){
    this.render = true;
  }
  ngOnDestroy(){
    this.userSub.unsubscribe();
  }
}
