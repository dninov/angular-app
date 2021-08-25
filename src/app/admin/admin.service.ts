import { error } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  allArr:Array<any> = [];
  usersArr:Array<any>=[];
 
  constructor(
    private  afs:AngularFirestore,
    private fns: AngularFireFunctions,
    private router: Router,
  ) { }

  getAllUsers():Observable<object>{
    console.log('getAllUsers');
    return this.afs.collection('users', (ref:any) => ref.where("role", '!=', 'admin')).valueChanges();
  }

  getUser(id:any){
    return  this.afs.collection('users').doc(id).get().toPromise();
  }

  async updateUserData(data:any, id:any){
    await this.afs.collection('users').doc(id).update(data); 
  } 

  async updateUserSchedule(data:any, id:any){
    await this.afs.collection('users').doc(id).collection('schedule').doc(id).set({schedule: data});
  }

  async getUserSchedule(id:any){
    return await this.afs.collection('users').doc(id).collection('schedule').doc(id).get().toPromise();
  }
  
  async deleteUser(email:any, id:any){
    const callable =  this.fns.httpsCallable('deleteUser');
    await callable({ email: email }).toPromise().then(async ()=>{
      try{
        await this.afs.collection('users').doc(id).collection('schedule').doc(id).delete();
        await this.afs.collection('users').doc(id).collection('messages').doc(id).delete();
        await this.afs.collection('users').doc(id).collection('messages-timestamps').doc(id).delete();
        await this.afs.collection('users').doc(id).delete();
      }catch(error){
        console.log(error);
      }
    });
  }

}

