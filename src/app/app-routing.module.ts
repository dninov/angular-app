import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './user/dashboard/dashboard.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {
    path:'',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo:'/dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./user/user.module').then(module => module.UserModule)
      }
    ]

  },
  {
    path:'',
    component: AdminDashboardComponent,
    children: [
      {
        path: '',
        redirectTo:'/admin-dashboard',
        pathMatch: 'full'
      },
      {
        path: 'admin-dashboard',
        loadChildren: () => import('./admin/admin.module').then(module => module.AdminModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
