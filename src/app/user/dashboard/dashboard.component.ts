import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ChatService } from 'src/app/shared/chat.service';
import { AuthService } from '../../auth/auth.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy, AfterViewInit {
  openSidenav = false;
  unreadMsg: number = 0;
  readMsg!: Subscription;
  adminMsg!: Subscription;
  id:any;
  constructor(
    private router: Router, 
    private authService: AuthService,
    private chatService: ChatService
  ) { }

  ngOnInit(): void {
   
  }
  ngAfterViewInit(){
    const user = JSON.parse(localStorage.getItem('user')!);
    this.id = user.uid;
    this.readMsg = this.chatService.getReadMsg(this.id).subscribe((result:any)=>{
      let allReadMsg:any = [];
      result.map((m:any)=>{
       allReadMsg.push(m.payload.doc.id);
      });
      this.checkForUnreadMsg(allReadMsg);
    })
   
  }
  checkForUnreadMsg(allReadMsg:any){
    this.adminMsg = this.chatService.getUserNewMessages(this.id ).subscribe((result)=>{
      let newMsg:any = [];
      result.map((m:any)=>{
        let data:any = m.payload.doc.data();
        newMsg.push(data)
      })
      newMsg = newMsg.filter((val:any) => !allReadMsg.includes(val.docId));
      if(newMsg.length>0){
        this.unreadMsg = 1;
      }else{
        this.unreadMsg = 0;
      }
    })
  }
  logout(){
    this.authService.logout();
  }
  showProfile(){
    this.router.navigate(['dashboard/profile']);
    
  }
  goSchedule(){
    this.router.navigate(['dashboard/schedule']);
  }
  goMail(){
    this.router.navigate(['dashboard/chat']);
  }
  ngOnDestroy(): void {
    this.adminMsg.unsubscribe();
    this.readMsg.unsubscribe();
  }
}
