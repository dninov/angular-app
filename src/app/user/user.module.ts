import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserRoutingModule } from './user-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { MaterialModue } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FullCalendarModule } from '@fullcalendar/angular'; 
import dayGridPlugin from '@fullcalendar/daygrid'; 
import interactionPlugin from '@fullcalendar/interaction';
import { UserChatComponent } from './user-chat/user-chat.component'; 
import { SharedModule } from '../shared/shared.module';
import { UserDeleteComponent } from './profile/user-delete/user-delete.component'
FullCalendarModule.registerPlugins([ 
  dayGridPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [
    DashboardComponent,
    ProfileComponent,
    ScheduleComponent,
    UserChatComponent,
    UserDeleteComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MaterialModue,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    FullCalendarModule,
    SharedModule
  ]
})
export class UserModule { }
