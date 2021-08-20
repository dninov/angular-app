import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css'],
  
})
export class UserCardComponent implements OnInit {
  @Input() user!: any;

  constructor(
    private router: Router,
  ) { }
  ngOnInit(): void {
  }
  scheduleClicked(){
    this.router.navigate(['admin-dashboard/schedule-builder', this.user.uid]); 
  }
  mailClicked(){
    this.router.navigate(['admin-dashboard/chat', this.user.uid]); 
  }

}
