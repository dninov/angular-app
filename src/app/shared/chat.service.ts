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

  sendMessage(msg:string, id:string, email:string, userId:string){
    this.date = new Date();

    let mediumDate = this.datePipe.transform(this.date, 'medium');
    const data = {
      message: msg,
      timeSent: mediumDate,
      email: email,
      id: userId
    }
    const newDoc:any = this.afs.collection('users').doc(id).collection('messages').doc();
    newDoc.set({
      message: msg,
      timeSent: mediumDate,
      email: email,
      id: userId,
      docId: newDoc.ref.id
    }, {merge: true});
  }

  getMessages(id:any):Observable<object>{
    return this.afs.collection('users').doc(id).collection('messages').valueChanges();
  }
  getNewMessages(id:any):any{
    return this.afs.collectionGroup('messages', (ref:any) => ref.where("id", '!=', id)).snapshotChanges();
  }
  async updateReadMsg(userId:string, msgId:any){
    this.afs.collection('users').doc(userId).collection('readMsg', ref => ref.where('id', "==", msgId)).snapshotChanges().subscribe(res => {
      if (res.length > 0)
      {
        return
      }
      else
      {
        console.log('update');
        this.afs.collection('users').doc(userId).collection('readMsg').doc(msgId).set({id:msgId}, {merge: true});
      }
  });
}
  getReadMsg(userId:string){
    return this.afs.collection('users').doc(userId).collection('readMsg').snapshotChanges();
  }
}
