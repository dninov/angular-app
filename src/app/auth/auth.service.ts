import { Injectable, NgZone } from '@angular/core';
import { User } from '../auth/user.model';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { switchMap , first} from 'rxjs/operators';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
   userData: any;
   pass: string = '';
  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router,
    private ngZone: NgZone,
    private fns: AngularFireFunctions) 
    {
      this.afAuth.authState.subscribe(user => {
        if (user) {
          this.userData = user;
          localStorage.setItem('user', JSON.stringify(this.userData));
          JSON.parse(localStorage.getItem('user')!);
        } else {
          this.userData = false;
          localStorage.removeItem('user');
          JSON.parse(localStorage.getItem('user')!);
        }
      })
    }

    SetUserData(user: any) {
      const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
      const userD: User = {
        uid: user.uid,
        email: user.email,
      }
      return userRef.set(userD, {
        merge: true
      })
    }

     emailSignup(email: string, password: string, role: string) {
      const userRole = role;
      this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(async value => {
        await this.SetUserData(value.user);
        if(userRole === "Администратор"){
          this.makeAdmin(email, password);
        }else{
          this.router.navigateByUrl('/dashboard');
        }
      })
      .catch(error => {
        console.log( error);
      });
    }

    async login(email: string, password: string) {
      try{
        const result = await this.afAuth.signInWithEmailAndPassword(email, password);
        const token = await result.user?.getIdTokenResult();
        await this.SetUserData(result.user);
        if(token?.claims.admin === true){
          this.router.navigateByUrl('/admin-dashboard');
        }else{ 
          this.router.navigateByUrl('/dashboard');
        }
      }catch(error){
        console.log(error.message);
      }
    }

     makeAdmin(userEmail: string, password: string){
        const callable =  this.fns.httpsCallable('addAdminRole');
        callable({ email: userEmail }).toPromise().then( value =>{
        this.logout();
        this.login(userEmail, password);
        this.router.navigateByUrl('/admin-dashboard');
      })
    }

    logout() {
      return this.afAuth.signOut().then(() => {
        localStorage.removeItem('user');
        this.router.navigate(['']);
      })
    }
    get isAuthenticated() {     
      return localStorage.getItem('user');
  }
    async isAdmin(){
      return await this.afAuth.authState.pipe(first()).toPromise().then(u=> { return u?.getIdTokenResult();
    });
  }
    get currentUserId() {
      const user = JSON.parse(localStorage.getItem('user')!);
      return user.uid;
     
    }
     
}