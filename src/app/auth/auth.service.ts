import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore} from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { AngularFireFunctions } from '@angular/fire/functions';
@Injectable()
export class AuthService {
   
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private fns: AngularFireFunctions) {
    }

    emailSignup(email: string, password: string, role: string) {
      const userRole = role;
      const userEmail = email;
      

      this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(value => {
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
    const result = await this.afAuth.signInWithEmailAndPassword(email, password);
    const token = await result.user?.getIdTokenResult();
    console.log(token?.claims.admin);
  }


   makeAdmin(userEmail: string){
   const callable = this.fns.httpsCallable('addAdminRole');
   callable({ email: userEmail }).toPromise().then(value =>{
    this.router.navigateByUrl('/admin-dashboard');
   })
    
  }
  logout() {
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }

//   private oAuthLogin(provider) {
//     return this.afAuth.signInWithPopup(provider);
//   }
}