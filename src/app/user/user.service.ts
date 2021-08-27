import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../auth/auth.service';
import { AngularFireFunctions } from '@angular/fire/functions';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  imgUrl: string = "";
  constructor(
    private afst: AngularFireStorage,
    private afs: AngularFirestore,
    private authService: AuthService,
    private fns: AngularFireFunctions,

  ) {}

  async  uploadImg(image: File, filePath: string){
    const task = this.afst.upload(filePath, image);
    await task.snapshotChanges().pipe().toPromise() 
  }

  async UpdateProfile(id:string, image: any, data:any){
    if(typeof image !== 'string'){
      const filePath = 'users/' + id +'/profileImg' +(image.name.substr(image.name.length - 4));
      const fileRef = this.afst.ref(filePath);
      await this.uploadImg(image, filePath).then(async ()=>{
        this.imgUrl = await fileRef.getDownloadURL().toPromise();
      })
    }else{
      this.imgUrl = image;
    }
    data.imgUrl = this.imgUrl;
    delete data.imageSrc;
    delete data.img;
    this.afs.collection('users').doc(id).update(data);
    }

userInfo(){
    // const user =  (JSON.parse(localStorage.getItem('user')!));    
    // return  this.afs.collection('users').doc(user.uid!).get().toPromise(); 
  }
async getSchedule(id:any){
  return await this.afs.collection('users').doc(id).collection('schedule').doc(id).get().toPromise();
}
async deleteUser(email:any, id:any){
  const callable =  this.fns.httpsCallable('deleteUser');
  await callable({ email: email }).toPromise().then(async ()=>{
    try{
      await this.afs.collection('users').doc(id).collection('schedule').doc(id).delete().catch(err=>console.log(err));
      await this.afs.collection('users').doc(id).collection('messages').doc(id).delete().catch(err=>console.log(err));
      await this.afs.collection('users').doc(id).collection('messages-timestamps').doc(id).delete().catch(err=>console.log(err));
      await this.afs.collection('users').doc(id).delete().catch(err=>console.log(err));
      this.authService.logout();
    }catch(error){
      console.log(error);
    }
  });
}

}
