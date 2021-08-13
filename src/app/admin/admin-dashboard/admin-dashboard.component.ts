import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { animations } from 'src/app/utils/animations';
import { ChatService } from 'src/app/shared/chat.service';
import { AdminService } from '../admin.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  animations: [animations]
})
export class AdminDashboardComponent implements OnInit, OnDestroy {
  openSidenav = false;
  unreadMsg:number = 0;
  msgUsers: any[] = [];
  readMsgSubscription!: Subscription;
  newMsgSubscription!: Subscription;
  constructor(
    private router: Router,
    private authService: AuthService,
    private chatService: ChatService,
    private adminService: AdminService,
  ) { }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user')!);
    this.readMsgSubscription = this.chatService.getReadMsg(user.uid).subscribe((result:any)=>{
      let allReadMsg:any = [];
      result.map((m:any)=>{
       allReadMsg.push(m.payload.doc.id);
      })
      if(allReadMsg.length>0){
        this.newMsgSubscription = this.chatService.getNewMessages(allReadMsg).subscribe((result:any)=>{
          let newMsg:any = [];
          result.map((m:any)=>{
            newMsg.push(m.payload.doc.data())
          })
          console.log(newMsg);
          let idsArrr = newMsg.map((item:any) => item.id).filter((value:any, index:any, self:any) => self.indexOf(value) === index)
          this.setUnreadMsg(idsArrr);
        })
      }
    })
  }

  setUnreadMsg(users:string[]){
    this.unreadMsg = users.length;
    users.forEach(user => {
      this.adminService.getUser(user).then((user:any)=>{
      this.msgUsers.push(user.data());
      this.logUsers();
      })
    });
   
  }
logUsers(){
  console.log(this.msgUsers[0].email);
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
  ngOnDestroy(): void {
    this.readMsgSubscription.unsubscribe();
    this.newMsgSubscription.unsubscribe();
  }
  msgClicked(e:any){
    console.log(e.target.value);
    
  }
}

