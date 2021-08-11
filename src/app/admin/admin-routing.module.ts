import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { ScheduleBuilderComponent } from './schedule-builder/schedule-builder.component';
import { ChatFormComponent } from '../shared/chat-form/chat-form.component';
const routes: Routes = [
    { 
      path: '',
      component: UsersListComponent
    },
    { 
      path: 'users-list',
      component: UsersListComponent
    },
    { 
      path: 'user-details/:uid',
      component: UserDetailsComponent
    },
    { 
      path: 'schedule-builder/:uid',
      component: ScheduleBuilderComponent
    },
    { 
      path: 'chat/:uid',
      component: ChatFormComponent
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
