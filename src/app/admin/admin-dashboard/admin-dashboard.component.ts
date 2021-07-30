import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { animations } from 'src/app/utils/animations';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  animations: [animations]
})
export class AdminDashboardComponent implements OnInit {
  openSidenav = false;
  constructor(
    private router: Router,
    private authService: AuthService,
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

