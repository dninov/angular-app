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
import { LoadUserAction, LoginAction, LogoutAction } from './store/auth.actions';
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
   loggedOut: boolean = false;
  constructor(
    private afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    private router: Router,
    private fns: AngularFireFunctions,
    private store: Store<State>
    ) 
    {}

    SetUser(role:string){
      console.log('AUTH SERVICE SetUser');
      if(this.authSub){
        this.authSub.unsubscribe();
      }
      this.authSub = this.afAuth.authState.subscribe((user:any) => {
        if (user || !this.loggedOut) {
          this.store.dispatch(new LoadUserAction(user.uid));
          console.log("AUTH SERVICE new LoadUserAction");
            if(role === "admin"){
              this.router.navigateByUrl('/admin-dashboard');
            }else{
              this.router.navigateByUrl('/dashboard');
            }
        }else{
          console.log("AUTH SERVICE Has user or logged out");
          
        }
      })
    }
    reloadSub(){
      if(this.authSub){
        this.authSub.unsubscribe();
      }
      this.authSub = this.afAuth.authState.subscribe((user:any) => {
          this.store.dispatch(new LoadUserAction(user.uid));
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
      this.store.dispatch(new LoginAction());
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
        if(error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password'){
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
      console.log("logout begin...");
      this.afAuth.signOut().then(() => {
      this.store.dispatch(new LogoutAction());
        if(this.authSub){
          console.log('logout authSub unsubscribe');
          this.authSub.unsubscribe();
        }
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
      console.log("AUTH SERVICE loadUser", id);
      return  this.afs.collection('users').doc(id).valueChanges();
    }
} 