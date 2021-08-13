import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
  @Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.css']
})
export class ChatFormComponent implements OnInit {
  chatId:any;
  userId:any
  message!:string;
  email!: string;
  constructor(
    private chat:ChatService,
    private authService: AuthService,
    private readonly route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user')!);
    this.userId = user.uid;
    this.email = user.email;
    if(this.route.snapshot.paramMap.get("uid") === null){
      this.chatId = user.uid;
    }else{
      this.chatId = this.route.snapshot.paramMap.get("uid");
    }
  }

  async send(){
    this.chat.sendMessage(this.message, this.chatId, this.email, this.userId);
    this.message = '';
  }

  handleSubmit(event:any){
    if(event.keyCode === 13){
      this.send();
    }
  }

}
