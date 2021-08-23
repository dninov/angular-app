import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ChatService } from 'src/app/shared/chat.service';
import { AuthService } from '../../auth/auth.service';
import { Store } from '@ngrx/store';
import { State } from 'src/app/app.reducer';
import { LoadUserAction } from 'src/app/auth/store/auth.actions';
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
  user!: object;
  constructor(
    private router: Router, 
    private authService: AuthService,
    private chatService: ChatService,
    private store: Store<State>,

  ) { }

  async ngOnInit(){
  
  }
  ngAfterViewInit(){

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
    //console.log('DASHBOARD userSub unsubscribe');
    //this.userSub.unsubscribe();
    // this.adminMsg.unsubscribe();
    // this.readMsg.unsubscribe();
  }
}
