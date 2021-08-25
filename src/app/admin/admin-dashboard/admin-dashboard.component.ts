import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { animations } from 'src/app/utils/animations';
import { ChatService } from 'src/app/shared/chat.service';
import { AdminService } from '../admin.service';
import { merge, Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from 'src/app/app.reducer';
import { ClearListAction, LoadUsersAction } from '../store/admin.actions';
import { AngularFirestore } from '@angular/fire/firestore';
import { takeWhile } from 'rxjs/internal/operators';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  animations: [animations]
})
export class AdminDashboardComponent implements OnInit, OnDestroy {
  unreadMsg:number = 0;
  msgUsers: any[] = [];
  usersSub!: Subscription;
  newMsgSubscription!: Subscription;
  allMsgs:any = [];
  loggedIn: boolean = true;
  allUsers:any;
  msgIDs: any[] = [];
  user$!: Observable<any>;
  userSub!: Subscription;
  newMsgSub!: Subscription;
  user!: any;

  constructor(
    private afs: AngularFirestore,
    private router: Router,
    private authService: AuthService,
    private chatService: ChatService,
    private adminService: AdminService, 
    private store: Store<State>,
    private readonly route: ActivatedRoute, 
  ) { } 

  ngOnInit(): void {
    this.user$ = this.store.select(store=> store.auth.user);
    this.userSub = this.user$.subscribe(async (userData:any)=>{
      console.log(userData);
      if(this.loggedIn){
        if(Object.keys(userData).length === 0){
          console.log('Profile no User');
          this.authService.reloadSub();
      }else{
        this.user = userData;
      }
    }
  })
    
    this.store.dispatch(new LoadUsersAction());
    this.usersSub = this.store.select(store=> store.admin.list).pipe(takeWhile(() => this.loggedIn)).subscribe((users)=>{      
      
      this.allUsers = users;
      let usersPassed = 0;
      users.forEach(async (user:any) => {
        usersPassed ++;
        let newMsgs = await this.chatService.getAdminUnreadMessages(user.uid);
        this.allMsgs.push(newMsgs);
        if(usersPassed === users.length){
          console.log('here');
          this.combineObservables(this.allMsgs);
        }
      });
    })
  }

  combineObservables(arr:[Observable<any>]){
      let allMsgObs = merge(...arr);
      this.newMsgSubscription = allMsgObs.pipe(takeWhile(() => this.loggedIn)).subscribe((result:any)=>{
      console.log(result[0]);
      let id = this.router.url.slice( - 28);
      if(result.length>0 ){
        if(result[0].id !== id && result[0].id !== this.user.uid){
          if(!this.msgIDs.includes(result[0].id)){
            this.msgIDs.push(result[0].id);
          }
          this.unreadMsg = this.msgIDs.length;
          this.msgIDs.forEach(id => {
            let currentUser = this.allUsers.filter((user:any) => user.uid === id)[0];
            if(!this.msgUsers.includes(currentUser)){
              this.msgUsers.push(currentUser);
            }
          });  
        }
      }
    });
  }

  logout(){
    this.loggedIn = false;
    this.authService.logout();
    this.store.dispatch(new ClearListAction());

  }

  showSchedule(){
    this.router.navigateByUrl('dashboard/schedule');
    console.log('schedule');
  }

  onSelect(user:any){
    this.msgIDs = this.msgIDs.filter(id=>id !== user.uid);
    this.msgUsers = this.msgUsers.filter(user=> user.uid !== user.uid);
    let newLocation = `admin-dashboard/chat/${user.uid}`;
    this.router.routeReuseStrategy.shouldReuseRoute = function () {return false;};
    this.router.navigateByUrl(newLocation).catch(err=>console.log(err));
  }

  ngOnDestroy(){
    this.loggedIn = false;
    this.usersSub.unsubscribe();
    if(this.newMsgSubscription !== undefined){
    this.newMsgSubscription.unsubscribe();
  }
    this.userSub.unsubscribe();
  }
}

 