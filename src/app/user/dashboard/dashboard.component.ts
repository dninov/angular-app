import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  openSidenav = false;
  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
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
