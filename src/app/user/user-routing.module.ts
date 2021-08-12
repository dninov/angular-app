import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { UserChatComponent } from './user-chat/user-chat.component';
const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
  },
  { 
    path: 'profile',
    component: ProfileComponent
  },
  { 
    path: 'schedule',
    component: ScheduleComponent
  },
  { 
    path: 'chat',
    component: UserChatComponent
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
