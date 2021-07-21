import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UsersListComponent } from './users-list/users-list.component';

const routes: Routes = [
  {
    path: '',
    component: UsersListComponent,
    children: [
      { 
        path: 'users',
        component: UsersListComponent
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
