import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';

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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
