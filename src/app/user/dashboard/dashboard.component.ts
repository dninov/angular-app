import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ChatService } from 'src/app/shared/chat.service';
import { AuthService } from '../../auth/auth.service';
import { Store } from '@ngrx/store';
import { State } from 'src/app/app.reducer';
import { LoadUserAction } from 'src/app/auth/store/auth.actions';
import { takeWhile } from 'rxjs/operators';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy, AfterViewInit {
  openSidenav = false;
  unreadMsg: number = 0;
  readMsg!: Subscription;
  adminMsg!: Subscription;
  id:any;
  user$!: Observable<any>;
  userSub!: Subscription;
  newMsgSub!: Subscription;
  user!: any;
  loggedIn: boolean = true;
  routerSub!: Subscription;

  constructor(
    private router: Router, 
    private authService: AuthService,
    private chatService: ChatService,
    private store: Store<State>,

  ) { }

  async ngOnInit(){
    this.routerSub = this.router.events.subscribe((val:any)=>{
      if(val.url === '/dashboard/chat'){
        this.unreadMsg = 0;
      }
    })
    this.user$ = this.store.select(store=> store.auth.user);
    this.userSub = this.user$.subscribe(async (userData:any)=>{
    if(this.loggedIn){
      if(userData !== undefined){
        if(Object.keys(userData).length === 0){
          console.log('Profile no User');
          this.authService.reloadSub();
        }else{
          console.log('Profile Has user',userData);
          this.user = userData;
          this.newMsgSub = (await this.chatService.getUserUnreadMessages(this.user.uid)).pipe(takeWhile(val => this.loggedIn)).subscribe((result:any)=>{
            if(result.length>0 && this.router.url !== '/dashboard/chat'){
              this.unreadMsg = 1;
            }else{
              this.unreadMsg = 0;
            }
          })
        }
      }
    }
    })
  }
  ngAfterViewInit(){

  }

  logout(){    
    this.loggedIn = false;
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
    this.loggedIn = false;
    this.userSub.unsubscribe();
    this.newMsgSub.unsubscribe();
    this.routerSub.unsubscribe();
  }
}
