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

  sendMessage(msg:string, id:string, email:string, userId:string){
    this.date = new Date();

    let mediumDate = this.datePipe.transform(this.date, 'medium');
    const data = {
      message: msg,
      timeSent: mediumDate,
      email: email,
      id: userId,
      read: false
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
   getAdminUnreadMessages(): Observable<any>{
    console.log('getAdminUnreadMessages');
    let newMsg:any = [];
    this.store.select(store=> store.admin.list).subscribe((users)=>{
      users.forEach(async user => {
        let timestamp:any  = await this.afs.collection('users').doc(user.uid).collection('messages-timestamps').doc('admin-timestamp').get().toPromise();
        let lastSeen = timestamp.data();
        let lastMsg:any = await this.afs.collection('users').doc(user.uid).collection('messages', (ref:any) => ref.where('timeSent', '>', lastSeen.lastSeen)).valueChanges();
        console.log(lastMsg);
        newMsg.push(lastMsg);
        // for(const doc of lastMsg.docs){
        //   console.log(doc.data());
        // }
      });
    })
      return forkJoin(newMsg);
  }
  getMessages(id:any):Observable<object>{ 
    return this.afs.collection('users').doc(id).collection('messages').valueChanges();
  }
  getNewMessages(id:any):any{ 
    return this.afs.collectionGroup('messages', (ref:any) => ref.where("id", '!=', id)).snapshotChanges();
  }
  getUserNewMessages(id:any){
    return this.afs.collection('users').doc(id).collection('messages', (ref:any) => ref.where("id", '!=', id)).snapshotChanges();
  }
  setTimestampUser(id:any){
    this.date = new Date();
    let mediumDate = this.datePipe.transform(this.date, 'medium');
    this.afs.collection('users').doc(id).collection('messages-timestamps').doc("user-timestamp").set({lastSeen:mediumDate});
  }
  setTimestampAdmin(id:any){
    this.date = new Date();
    let mediumDate = this.datePipe.transform(this.date, 'medium');
    this.afs.collection('users').doc(id).collection('messages-timestamps').doc("admin-timestamp").set({lastSeen:mediumDate});
  }
//   async updateReadMsg(userId:string, msgId:any){
//     this.afs.collection('users').doc(userId).collection('readMsg', ref => ref.where('id', "==", msgId)).snapshotChanges().subscribe(res => {
//       if (res.length > 0)
//       {
//         return
//       }
//       else
//       {
//         console.log('update');
//         this.afs.collection('users').doc(userId).collection('readMsg').doc(msgId).set({id:msgId}, {merge: true});
//       }
//   });
// }
//   getReadMsg(userId:string){
//     return this.afs.collection('users').doc(userId).collection('readMsg').valueChanges();
//   }
}
