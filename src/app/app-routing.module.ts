import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { GuardService} from './guards/guard.service'
import { AdminGuardService} from './guards/admin-guard.service'
import { NoUserGuardService } from './guards/no-user-guard.service'
const routes: Routes = [
  
  {
    path: '', 
    component: HomeComponent,
    canActivate: [NoUserGuardService]
  },
  {
    path:'',
    component: DashboardComponent,
    canActivate: [GuardService],
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
    canActivate: [AdminGuardService],
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
  },
  {
    path: '**',
    pathMatch: 'full',
    component: HomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
