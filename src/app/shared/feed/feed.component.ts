import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { ChatService } from '../chat.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class FeedComponent implements  OnDestroy, OnInit, OnChanges {

  chatId:any;
  msgArray!:any;
  messages!: Subscription;
  constructor(
    private chat: ChatService,
    private readonly route: ActivatedRoute,

  ) { }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user')!); 
    if(this.route.snapshot.paramMap.get("uid") === null){
      this.chatId = user.uid;
    }else{
      this.chatId = this.route.snapshot.paramMap.get("uid");
    }
    this.msgArray = this.chat.getMessages(this.chatId);
    this.messages = this.msgArray.subscribe((result:any)=>{
      let notOwnMsg = result.filter((m:any)=>{
       return m.id !== user.uid;
      })
      notOwnMsg.forEach((m:any) => {
        this.chat.updateReadMsg(user.uid, m.docId);
       });
    })
  }
  ngOnChanges(){
    this.msgArray = this.chat.getMessages(this.chatId);
  }
  ngOnDestroy(): void {
    this.messages.unsubscribe();
  }

}