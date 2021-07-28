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

  async UpdateProfile(
    image: any, 
    data:{
      fullName: string, 
      phoneNumber: string, 
      nickName: string, 
      ar:string, 
      poker:string, 
      blackjack:string, 
      baccart:string, 
      startDate:Date} ){
    const user = JSON.parse(localStorage.getItem('user')!);
    const id = user.uid;
    
    if(image === "default"){
      this.imgUrl = '../../../assets/user-icon.jpg';
    }else{
    const filePath = 'users/' + id +'/profileImg' +(image.name.substr(image.name.length - 4));
    const fileRef = this.afst.ref(filePath);
    await this.uploadImg(image, filePath).then(async ()=>{
      this.imgUrl = await fileRef.getDownloadURL().toPromise();
    })
    }
    
    
    this.as.userData.updateProfile({
        displayName: data.fullName,
        photoURL: this.imgUrl
        }); 
   
    const userInfo: object = {
        phoneNumber: data.phoneNumber,
        nickName: data.nickName,
        ar: data.ar,
        poker: data.poker,
        blackjack: data.blackjack,
        baccart: data.baccart,
        startDate: data.startDate,
        imgUrl: this.imgUrl
      }

    this.afs.collection('users').doc(id).update(userInfo).then(()=>{
        this.as.SetUserData(this.as.userData);   
      })
    }
    userInfo(){
    const user =  (JSON.parse(localStorage.getItem('user')!));    
    return  this.afs.collection('users').doc(user.uid!).get().toPromise(); 
  }
}
