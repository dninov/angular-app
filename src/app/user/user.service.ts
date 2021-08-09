import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { finalize } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  imgUrl: string = "";
  constructor(
    private afst: AngularFireStorage,
    private afs: AngularFirestore,
    private as: AuthService,
  ) {}

  async  uploadImg(image: File, filePath: string){
    const task = this.afst.upload(filePath, image);
    await task.snapshotChanges().pipe().toPromise() 
  }

  async UpdateProfile(image: any, data:any){
    const user = JSON.parse(localStorage.getItem('user')!);
    const id = user.uid;
    if(image !== ""){
      const filePath = 'users/' + id +'/profileImg' +(image.name.substr(image.name.length - 4));
      const fileRef = this.afst.ref(filePath);
      await this.uploadImg(image, filePath).then(async ()=>{
        this.imgUrl = await fileRef.getDownloadURL().toPromise();
      })
    }else{
      this.imgUrl = "../../../assets/user-icon.jpg";
    }
    
    this.as.userData.updateProfile({
        displayName: data.fullName,
        photoURL: this.imgUrl
        }); 
   
    data.imgUrl = this.imgUrl;
    delete data.imageSrc;
    delete data.img;
    this.afs.collection('users').doc(id).update(data);
    }

userInfo(){
    const user =  (JSON.parse(localStorage.getItem('user')!));    
    return  this.afs.collection('users').doc(user.uid!).get().toPromise(); 
  }
async getSchedule(){
  const user = JSON.parse(localStorage.getItem('user')!);
  const id = user.uid;
  return await this.afs.collection('users').doc(id).collection('schedule').doc(id).get().toPromise();
}

}
