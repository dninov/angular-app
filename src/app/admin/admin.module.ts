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
import { FullCalendarModule } from '@fullcalendar/angular'; 
import dayGridPlugin from '@fullcalendar/daygrid'; 
import interactionPlugin from '@fullcalendar/interaction';
import { DeleteDialogComponent } from './user-details/delete-dialog/delete-dialog.component'; 
import { SharedModule } from '../shared/shared.module';
import { ChatComponent } from './chat/chat.component';
import { FormFilterPipe } from './users-list/form-filter.pipe';
FullCalendarModule.registerPlugins([ 
  dayGridPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [
    UsersListComponent,
    UserCardComponent,
    UserDetailsComponent,
    ScheduleBuilderComponent,
    DeleteDialogComponent,
    ChatComponent,
    FormFilterPipe,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModue,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    FullCalendarModule,
    SharedModule
  ], 
  providers:[
    {
    provide: AdminService,
    useClass: AdminService
  }
],

})
export class AdminModule { }
