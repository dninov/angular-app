import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { ChatMessage } from './chat.message.model';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { DatePipe } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  user: any;
  date!: Date;
  constructor(
    private db: AngularFireDatabase,
    private afs: AngularFirestore,
    private datePipe: DatePipe
  ) { }

  sendMessage(msg:string, id:string, email:string){
    this.date = new Date();
    let mediumDate = this.datePipe.transform(this.date, 'medium');
    const data = {
      message: msg,
      timeSent: mediumDate,
      email: email,
      id: id
    }
    this.afs.collection('users').doc(id).collection('messages').doc().set({messages: data}, {merge: true});
  }

  getMessages(id:any):Observable<object>{
    return this.afs.collection('users').doc(id).collection('messages').valueChanges();
  }
}
