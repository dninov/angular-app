import { Injectable} from '@angular/core';
import { User } from '../auth/user.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { first } from 'rxjs/operators';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from 'src/app/app.reducer';
import { LoadUserAction, LogoutAction } from './store/auth.actions';
import { ThrowStmt } from '@angular/compiler';

@Injectable()
export class AuthService {
   userData: any;
   pass: string = '';
   validLogin = true;
   errorMsg: string="";
   user!: Observable<any>;
   userSub!: Subscription;
   authSub!: Subscription;
  constructor(
    private afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    private router: Router,
    private fns: AngularFireFunctions,
    private store: Store<State>
    ) 
    {}


    SetUser(role:string){
      console.log('SetUser');

      this.authSub = this.afAuth.authState.subscribe((user:any) => {
        if (user) {
          console.log("afAuth Subscribe");
          this.store.dispatch(new LoadUserAction(user.uid));
          this.user = this.store.select(store=> store.auth.user);
          this.userSub = this.user.subscribe((userData:any)=>{
            console.log("user.subscribe", userData);
            if(role === "admin"){
              this.router.navigateByUrl('/admin-dashboard');
            }else{
              this.router.navigateByUrl('/dashboard');
            }
          })
        }else{
          this.authSub.unsubscribe();
        }
      })
    }
    SetUserData(user: any) {
      const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
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

     emailSignup(user:any) {
       this.SetUserData(user).then(()=>{
        if(user.roles === "admin"){
          this.makeAdmin(user.email, user.password, user.uid);
         }else{
           this.SetUser("user");
       }
       })
    }

    async login(email: string, password: string) {
      console.log('login');
      
      try{
        const result = await this.afAuth.signInWithEmailAndPassword(email, password);
        const token = await result.user?.getIdTokenResult();
        if(token?.claims.admin === true){
          this.validLogin = true;
          this.SetUser("admin");
        }else{ 
          this.validLogin = true;
          this.SetUser("user");
        }
      }catch(error){
        if(error.code === 'auth/user-not-found'){
          this.validLogin = false;
        }else{
          console.log(error.code);
        }
      }
    }

     makeAdmin(userEmail: string, password: string, id:string){
        const callable =  this.fns.httpsCallable('addAdminRole');
        callable({ email: userEmail }).toPromise().then( value =>{
        this.logout();
        this.login(userEmail, password).catch(err=>console.log(err));
        this.SetUser("admin");
      }).catch(err => console.log(err));
    } 

    async logout() {
      if(this.userSub){
        this.userSub.unsubscribe();
      }
      this.store.dispatch(new LogoutAction());
      this.afAuth.signOut().then(() => {
      this.router.navigate(['']);
      console.log( this.isAdmin());
      
      }).catch(err=>console.log(err));
    }

    async isAdmin(){
      return await this.afAuth.authState.pipe(first()).toPromise().then(u=> {
         return u?.getIdTokenResult();
    }).catch(err => console.log(err));
   }

    loadUser(id:any){
      console.log("getUser", id);
      return  this.afs.collection('users').doc(id).valueChanges();
    }
    getUser(){
      console.log('getUser');
      return this.user;
    }
} 