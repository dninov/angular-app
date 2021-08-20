import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { UsersListComponent } from './users-list/users-list.component';
import { MaterialModue } from './../material.module'
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
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
import { StoreModule} from '@ngrx/store';
import { AdminReducer } from './store/admin.reducer';
import { AdminEffects } from './store/admin.effects';
import { EffectsModule } from '@ngrx/effects';

FullCalendarModule.registerPlugins([ 
  dayGridPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [
    AdminDashboardComponent,
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
    SharedModule,
    StoreModule.forFeature('admin', AdminReducer),
    EffectsModule.forFeature([AdminEffects]),
  ], 
  providers:[
    {
    provide: AdminService,
    useClass: AdminService
  }
],

})
export class AdminModule { }
