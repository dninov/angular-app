import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { ScheduleComponent } from './schedule/schedule.component';


@NgModule({
  declarations: [
    ProfileComponent,
    ScheduleComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
