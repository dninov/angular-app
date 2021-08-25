import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { ChatMessage } from './chat.message.model';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { DatePipe } from '@angular/common';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from 'src/app/app.reducer';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  userArr:any;
  storeUserArr!:Observable<Array<any>>;
  user: any;
  date!: Date;
  constructor(
    private db: AngularFireDatabase,
    private afs: AngularFirestore,
    private datePipe: DatePipe,
    private store: Store<State>

  ) { }

  sendMessage(msg:string, id:string, email:string, userId:string, role:string){
    this.date = new Date();
    //let mediumDate = this.datePipe.transform(this.date, 'medium');
    const data = {
      message: msg,
      timeSent: this.date,
      email: email,
      id: userId,
      read: false
    }
   this.afs.collection('users').doc(id).collection('messages').doc().set(data, {merge: true});
    if(role === 'user'){
      setTimeout(() => { this.setTimestampUser(id); }, 5000);
    }else{
      setTimeout(() => { this.setTimestampAdmin(id); }, 5000);
    }
  }
  async getAdminUnreadMessages(id:any): Promise<Observable<any>>{ 
    console.log('getAdminUnreadMessages');
    
    let timestamp:any  = await this.afs.collection('users').doc(id).collection('messages-timestamps').doc('admin-timestamp').get().toPromise();
    let lastSeen = timestamp.data();
    if(lastSeen === undefined){
      return this.afs.collection('users').doc(id).collection('messages').valueChanges();
    }else{
      return this.afs.collection('users').doc(id).collection('messages', (ref:any) => ref.where('timeSent', '>', lastSeen.lastSeen)).valueChanges();
    }
  }
  async getUserUnreadMessages(id:any): Promise<Observable<any>>{ 
    let timestamp:any  = await this.afs.collection('users').doc(id).collection('messages-timestamps').doc('user-timestamp').get().toPromise();
    let lastSeen = timestamp.data();
    if(lastSeen === undefined){
      return this.afs.collection('users').doc(id).collection('messages', (ref:any) => ref.where('id', '!=', id)).valueChanges();
    }else{
      return this.afs.collection('users').doc(id).collection('messages', (ref:any) => ref.where('timeSent', '>', lastSeen.lastSeen)).valueChanges();
    }
  }
  getMessages(id:any):Observable<object>{ 
    return this.afs.collection('users').doc(id).collection('messages').valueChanges();
  }
  setTimestampUser(id:any){
    this.date = new Date();
    //let mediumDate = this.datePipe.transform(this.date, 'medium');
    this.afs.collection('users').doc(id).collection('messages-timestamps').doc("user-timestamp").set({lastSeen:this.date});
  }
  setTimestampAdmin(id:any){
    this.date = new Date();
    //let mediumDate = this.datePipe.transform(this.date, 'medium');
    this.afs.collection('users').doc(id).collection('messages-timestamps').doc("admin-timestamp").set({lastSeen:this.date});
  }
}
