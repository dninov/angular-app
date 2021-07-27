import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  openSidenav = false;
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }
  logout(){
    this.authService.logout();
  }
  showProfile(){
    this.router.navigateByUrl('dashboard/profile');
    console.log('profile');
    
  }
  showSchedule(){
    this.router.navigateByUrl('dashboard/schedule');
    console.log('schedule');
  }
}

