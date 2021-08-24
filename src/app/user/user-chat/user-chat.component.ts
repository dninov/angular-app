import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { ChatService } from 'src/app/shared/chat.service';
import { Store } from '@ngrx/store';
import { State } from 'src/app/app.reducer';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-user-chat',
  templateUrl: './user-chat.component.html',
  styleUrls: ['./user-chat.component.css']
})
export class UserChatComponent implements OnInit, OnDestroy, OnChanges {
  user$!: Observable<any>;
  userSub!: Subscription;
  user!: any;
  constructor(
    private chatService:ChatService,
    private authService:AuthService,
    private store: Store<State>,
  ) { }

  ngOnInit(): void {
    this.user$ = this.store.select(store=> store.auth.user);
    this.userSub = this.user$.subscribe(async (userData:any)=>{
      this.user = userData;
      if(Object.keys(userData).length === 0){
          console.log('Profile no User');
          this.authService.reloadSub();
      }else{
          console.log('Profile Has user',userData);
      } 
    })
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
  ngOnChanges(): void {
    this.chatService.setTimestampUser(this.user.uid);
  }

}  
