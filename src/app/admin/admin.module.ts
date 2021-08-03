import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { UsersListComponent } from './users-list/users-list.component';
import { MaterialModue } from './../material.module'
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserCardComponent } from './user-card/user-card.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { AdminService } from './admin.service';
import { ScheduleBuilderComponent } from './schedule-builder/schedule-builder.component';
import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // a plugin!


FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [
    UsersListComponent,
    UserCardComponent,
    UserDetailsComponent,
    ScheduleBuilderComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModue,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    FullCalendarModule
  ], 
  providers:[
    {
    provide: AdminService,
    useClass: AdminService
  }
],

})
export class AdminModule { }
