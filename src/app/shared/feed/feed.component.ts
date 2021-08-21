import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { ChatService } from '../chat.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class FeedComponent implements  OnDestroy, OnInit, OnChanges {

  chatId:any;
  msgArray!:any;
  messages!: Subscription;
  user: any;
  constructor(
    private chat: ChatService,
    private readonly route: ActivatedRoute, 
    private authService: AuthService,

  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')!); 
    if(this.route.snapshot.paramMap.get("uid") === null){
      this.chatId = this.user.uid;
      this.chat.setTimestampUser(this.chatId);
    }else{
      this.chatId = this.route.snapshot.paramMap.get("uid");
      this.chat.setTimestampAdmin(this.chatId);
    }
    this.msgArray = this.chat.getMessages(this.chatId); 
    this.messages = this.msgArray.subscribe((result:any)=>{
      console.log("messages");
      
      // let notOwnMsg = result.filter((m:any)=>{
      //  return m.id !== this.user.uid;
      // })
      // notOwnMsg.forEach((m:any) => {
      //   this.chat.updateReadMsg(this.user.uid, m.docId);
      //  });
    });
  }
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
    this.messages.unsubscribe();
  }

}