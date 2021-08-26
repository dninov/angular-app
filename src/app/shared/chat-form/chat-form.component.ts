import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from 'src/app/app.reducer';
import { Observable, Subscription } from 'rxjs';
  @Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.css']
})
export class ChatFormComponent implements OnInit, OnDestroy {
  chatId:any;
  userId:any
  message!:string;
  email!: string;
  user$!:Observable<any>;
  userSub!: Subscription;
  user:any;
  constructor(
    private chat:ChatService,
    private authService: AuthService,
    private readonly route: ActivatedRoute,
    private store: Store<State>
  ) { }

  ngOnInit(): void {
    this.user$ = this.store.select(store=> store.auth.user);
    this.userSub = this.user$.subscribe((userData:any)=>{
      if(userData !== undefined){
        this.user = userData;
        this.userId = userData.uid;
        this.email = userData.email;
        if(userData.role === "user"){
          this.chatId = userData.uid;
        }else{
          this.chatId = this.route.snapshot.paramMap.get("uid");
        }
      }
    });
  }

  async send(){
    if(this.user.role === 'user'){
      this.chat.sendMessage(this.message, this.chatId, this.email, this.userId, 'user');
    }else{
      this.chat.sendMessage(this.message, this.chatId, this.email, this.userId, 'admin');
    }
    this.message = '';
  }

  handleSubmit(event:any){
    if(event.keyCode === 13){
      this.send();
    }
  }
  ngOnDestroy(){
    this.userSub.unsubscribe();
  }
}
