import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserRoutingModule } from './user-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { MaterialModue } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
@NgModule({
  declarations: [
    DashboardComponent,
    ProfileComponent,
    ScheduleComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MaterialModue,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ]
})
export class UserModule { }
