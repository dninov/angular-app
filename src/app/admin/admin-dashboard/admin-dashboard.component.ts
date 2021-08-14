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
    this.readMsgSubscription = this.chatService.getReadMsg(user.uid).subscribe(async (result:any)=>{
      let allReadMsg:any = [];
      result.map((m:any)=>{
       allReadMsg.push(m.payload.doc.id);
      })
      if(allReadMsg.length>0){
       this.chatService.getNewMessages(user.uid).subscribe((result:any)=>{
         result.map((m:any)=>{
          // console.log(allReadMsg);
           
           console.log(m.payload.doc.data());
         })
         
       })
        
        //console.log(allMsg);
        // this.newMsgSubscription = this.chatService.getNewMessages(allReadMsg, user.uid).subscribe((result:any)=>{
        //   let newMsg:any = [];
        //   result.map((m:any)=>{
        //     newMsg.push(m.payload.doc.data())
        //   })
        //   newMsg = newMsg.filter((m:any)=> {return m.id !== user.uid; })
        //  let idsArrr = newMsg.map((item:any) => item.id).filter((value:any, index:any, self:any) => self.indexOf(value) === index)
        //  this.setUnreadMsg(idsArrr);
        // })
      }
    })
  }

  setUnreadMsg(users:string[]){
    this.msgUsers = [];
    this.unreadMsg = users.length;
    console.log(users);
    
    users.forEach(user => {
      this.adminService.getUser(user).then((user:any)=>{
      this.msgUsers.push(user.data());
      console.log(this.msgUsers);
      })
    });
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
  onSelect(user:any){
    this.router.navigate(['admin-dashboard/chat', user.uid]); 
  }

}

