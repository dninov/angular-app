import { Injectable, NgZone } from '@angular/core';
import { User } from '../auth/user.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { first } from 'rxjs/operators';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Router } from '@angular/router';
import { ChatService } from '../shared/chat.service';
@Injectable()
export class AuthService {
   userData: any;
   pass: string = '';
   validLogin = true;
   errorMsg: string="";
  constructor(
    private afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    private router: Router,
    private fns: AngularFireFunctions,
    private chatService: ChatService,
    private ngZone: NgZone,
    ) 
    {
      this.afAuth.authState.subscribe(user => {
        if (user) {
          this.userData = user;
          localStorage.setItem('user', JSON.stringify(this.userData));
        } else {
          this.userData = false;
          localStorage.setItem('user', '');
        }
      })
    }

    SetUserData(user: any) {
      const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
      this.afs.collection('users').doc(user.uid).collection('readMsg').doc('Initialization').set({id:user.uid});
      const userD: User = {
        uid: user.uid,
        email: user.email,
        role: user.roles,
        ar: false,
        baccart: false,
        blackjack: false,
        casino: "",
        fullName: "",
        imgUrl: "../../../assets/user-icon.jpg",
        nickName: "",
        phoneNumber: "",
        poker: false,
      }
      return userRef.set(userD, {
        merge: true
      })
    }

     async emailSignup(user:any) {
       await this.SetUserData(user);
       if(user.roles === "admin"){
         this.makeAdmin(user.email, user.password);
        }else{
          this.router.navigateByUrl('/dashboard');
      }
    }

    async login(email: string, password: string) {
      try{
        const result = await this.afAuth.signInWithEmailAndPassword(email, password);
        localStorage.setItem('user', JSON.stringify(result.user));
        console.log(result.user?.uid);
        const token = await result.user?.getIdTokenResult();
        if(token?.claims.admin === true){
          this.validLogin = true;
          this.router.navigateByUrl('/admin-dashboard');
        }else{ 
          this.validLogin = true;
         this.router.navigateByUrl('/dashboard');
        }
      }catch(error){
        if(error.code === 'auth/user-not-found'){
          this.validLogin = false;
        }else{
          console.log(error.code);
        }
      }
    }

     makeAdmin(userEmail: string, password: string){
        const callable =  this.fns.httpsCallable('addAdminRole');
        callable({ email: userEmail }).toPromise().then( value =>{
        this.logout();
        this.login(userEmail, password).catch(err=>console.log(err));
        this.router.navigateByUrl('/admin-dashboard');
      }).catch(err => console.log(err));
    } 

    logout() {
      return this.afAuth.signOut().then(() => {
        localStorage.removeItem('user');
        this.router.navigate(['']);
      }).catch(err=>console.log(err));
    }
    get isAuthenticated() {     
      return localStorage.getItem('user');
  }
    async isAdmin(){
      return await this.afAuth.authState.pipe(first()).toPromise().then(u=> {
         return u?.getIdTokenResult();
    }).catch(err => console.log(err));
  }
    get currentUserId() {
      const user = JSON.parse(localStorage.getItem('user')!);
      return user.uid;
    }
     
} 