import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { animations } from 'src/app/utils/animations';
import { ChatService } from 'src/app/shared/chat.service';
import { AdminService } from '../admin.service';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from 'src/app/app.reducer';
import { LoadUsersAction, LoadReadMessagesAction } from '../store/admin.actions';
import { HostListener } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
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
  user:any;
  constructor(
    private afs: AngularFirestore,
    private router: Router,
    private authService: AuthService,
    private chatService: ChatService,
    private adminService: AdminService, 
    private store: Store<State>
  ) { }

  ngOnInit(): void {
    this.user = this.authService.getUser();
    console.log(this.user);
    
    //this.user = this.store.select(store=> store.auth.user);
    //this.user.subscribe((userData:any)=>{
      //this.chatService.getAdminUnreadMessages(userData.uid);
      //this.store.dispatch(new LoadReadMessagesAction(userData.uid)); 
   // })
    //this.store.dispatch(new LoadUsersAction());
   
    // this.store.dispatch(new LoadReadMessagesAction(this.user.uid)); 
      // this.readMsgSubscription = this.chatService.getReadMsg(user.uid).subscribe((result:any)=>{
      //     let allReadMsg:any = []; 
      //     result.map((m:any)=>{
      //      allReadMsg.push(m.payload.doc.id); 
      //     });
      //     if(allReadMsg.length>0){
      //       this.newMsgSubscription = this.chatService.getNewMessages(user.uid).subscribe((result:any)=>{
      //         if(result){
      //           let newMsg:any = [];
      //           result.map((m:any)=>{
      //             let data:any = m.payload.doc.data();
      //             console.log(data);
                  
      //             newMsg.push(data)
      //           })
      //           newMsg = newMsg
      //           .filter((val:any) => !allReadMsg.includes(val.docId))
      //           .map((item:any) => item.id).filter((value:any, index:any, self:any) => self.indexOf(value) === index);
      //           console.log(newMsg);
      //           this.setUnreadMsg(newMsg);    
      //         }
      //      })
      //     }
      // })
  }

  setUnreadMsg(users:string[]){
        this.msgUsers = [];
        this.unreadMsg = users.length;
        users.forEach(user => {
          this.adminService.getUser(user).then((user:any)=>{
            this.msgUsers.push(user.data());
            this.msgUsers =  [...this.msgUsers]
            console.log(this.msgUsers);
            
          }) 
        });
  }

  logout(){
    this.authService.logout();
  }

  showSchedule(){
    this.router.navigateByUrl('dashboard/schedule');
    console.log('schedule');
  }

  onSelect(user:any){
    let newLocation = `admin-dashboard/chat/${user.uid}`;
    this.router.routeReuseStrategy.shouldReuseRoute = function () {return false;};
    this.router.navigateByUrl(newLocation).catch(err=>console.log(err));
  }
  ngOnDestroy(){
    //let user = JSON.parse(localStorage.getItem('user')!);
    //this.afs.collection('users').doc(user.uid).set({lastOnline:Date.now()});
    // this.readMsgSubscription.unsubscribe();
    // this.newMsgSubscription.unsubscribe();
  }
}

 