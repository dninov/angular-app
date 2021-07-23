import { Injectable, NgZone } from '@angular/core';
import { User } from '../auth/user.model';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage'
import { AngularFireFunctions } from '@angular/fire/functions';
import { Router } from '@angular/router';
@Injectable()
export class AuthService {
   userData: any;
   uploadPercent!: Observable<number>;
   downloadURL!: Observable<string>;
  constructor(
    private afst: AngularFireStorage,
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
          localStorage.setItem('user', null!);
          JSON.parse(localStorage.getItem('user')!);
        }
      })
    }

    SetUserData(user: any) {
      const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
      const userData: User = {
        uid: user.uid,
        email: user.email,
      }
      return userRef.set(userData, {
        merge: true
      })
    }
    async uploadImg(image: File){
        const filePath = 'users/' + this.userData.uid +'/' + image.name;
        const fileRef = this.afst.ref(filePath);
        const task = this.afst.upload(filePath, image);
        task.snapshotChanges().pipe(
        finalize(() => this.downloadURL = fileRef.getDownloadURL() )
     )
    .subscribe()
    const url = await this.downloadURL.toPromise();
    console.log(url);
    
    }

    async UpdateProfile(nickName: string, fullName: string, phone: string, imgPath: string) {
      
    }

    emailSignup(email: string, password: string, role: string) {
      const userRole = role;
      const userEmail = email;
      this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(value => {
        this.SetUserData(value.user);
        if(userRole === "Администратор"){
          this.makeAdmin(userEmail);
        }else{
          this.router.navigateByUrl('/dashboard');
        }
      })
      .catch(error => {
        console.log('Something went wrong: ', error);
      });
    }

    async login(email: string, password: string) {
      try{
        const result = await this.afAuth.signInWithEmailAndPassword(email, password);
        const token = await result.user?.getIdTokenResult();
        this.SetUserData(result.user);
        if(token?.claims.admin === true){
          this.router.navigateByUrl('/admin-dashboard');
        }else{
          this.router.navigateByUrl('/dashboard');
        }
      }catch(error){
        console.log(error.message);
      }
    }

    makeAdmin(userEmail: string){
        const callable = this.fns.httpsCallable('addAdminRole');
        callable({ email: userEmail }).toPromise().then(value =>{
        this.router.navigateByUrl('/admin-dashboard');
      })
    }

    logout() {
      return this.afAuth.signOut().then(() => {
        localStorage.removeItem('user');
        this.router.navigate(['']);
      })
    }
}