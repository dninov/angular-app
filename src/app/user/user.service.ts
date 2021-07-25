import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage'
import { finalize } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  imgUrl: string = "";
  constructor(
    private afAuth: AngularFireAuth,
    private afst: AngularFireStorage,
    private as: AuthService,
  ) {

   }
  
  UpdateProfile(image: File, data:{fullName: string, phone: string, nickName: string} ) {
    console.log(this.as.currentUserId);
    
    const filePath = 'users/' + this.as.currentUserId +'/profileImg' +(image.name.substr(image.name.length - 4));
    const fileRef = this.afst.ref(filePath);
    const task = this.afst.upload(filePath, image);
   
    task.snapshotChanges().pipe(
       finalize(async () =>{
         try{
           this.imgUrl = await fileRef.getDownloadURL().toPromise();
            this.as.userData.updateProfile({
            displayName: data.fullName,
            photoURL: this.imgUrl
            }); 

         }catch(error){
           console.log(error);
         }
          })
      ).toPromise()
    }
}
