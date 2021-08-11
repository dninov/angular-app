import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { ChatMessage } from './chat.message.model';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  user: any;
  chatMessages!: Observable<ChatMessage[]>
  chatMessage!: ChatMessage;
  constructor(
    private db: AngularFireDatabase,

  ) { }

  sendMessage(msg:string){
    // const timestamp = this.getTimeStamp();
    // const email = this.user.email;
    // this.chatMessages = this.getMessages();
    // this.chatMessages.push({
    //   message: msg,
    //   timeSent: timestamp,
    //   userName: this.userName,
    //   email: email
    // })
  }
}
