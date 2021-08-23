import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { ChatService } from '../chat.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Store } from '@ngrx/store';
import { State } from 'src/app/app.reducer';
import { LoadUserAction } from 'src/app/auth/store/auth.actions';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class FeedComponent implements  OnDestroy, OnInit, OnChanges {

  chatId:any;
  msgArray!:any;
  messages!: Subscription;
  user$!: Observable<any>;
  userSub!: Subscription;
  user!: any;
  constructor(
    private chat: ChatService,
    private readonly route: ActivatedRoute, 
    private authService: AuthService,
    private store: Store<State>
  ) { }

  ngOnInit(): void {
    this.user$ = this.store.select(store=> store.auth.user);
    this.userSub = this.user$.subscribe((userData:any)=>{
      this.user = userData;
      if(Object.keys(userData).length === 0){
          console.log('Chat no User');
          this.authService.reloadSub();
      }else{
          console.log('Chat Has user',userData);
          if(this.route.snapshot.paramMap.get("uid") === null){
            this.chatId = this.user.uid;
            this.chat.setTimestampUser(this.chatId);
          }else{
            this.chatId = this.route.snapshot.paramMap.get("uid");
            this.chat.setTimestampAdmin(this.chatId);
          }
        }
    });
  }
    // this.msgArray = this.chat.getMessages(this.chatId); 
    // this.messages = this.msgArray.subscribe((result:any)=>{
    //   console.log("messages");
      
      // let notOwnMsg = result.filter((m:any)=>{
      //  return m.id !== this.user.uid;
      // })
      // notOwnMsg.forEach((m:any) => {
      //   this.chat.updateReadMsg(this.user.uid, m.docId);
      //  });
    // });
  ngOnChanges(){
    console.log("change ");
    if(this.route.snapshot.paramMap.get("uid") === null){
      this.chatId = this.user.uid;
      this.chat.setTimestampUser(this.chatId);
    }else{
      this.chatId = this.route.snapshot.paramMap.get("uid");
      console.log("change ", this.chatId);
      
      this.chat.setTimestampAdmin(this.chatId);
    }
    this.msgArray = this.chat.getMessages(this.chatId);
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

}