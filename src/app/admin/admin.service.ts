import { error } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  allArr:Array<any> = [];
  usersArr:Array<any>=[];
 
  constructor(
    private  afs:AngularFirestore,
    private fns: AngularFireFunctions,
    private router: Router,
  ) { }
  getAllUsers():Observable<object>{
    return this.afs.collection('users', (ref:any) => ref.where("role", '!=', 'admin')).valueChanges();
    // this.allArr = []; 
    // return  await this.afs.collection('users').get().toPromise().then( record=>{
    //   record.docs.forEach( entry => {
    //     this.allArr.push(entry.data());
    //   });  
    // }).then(r=>{
    //   this.removeAdmin()})
  }
   getUser(id:any){
    return  this.afs.collection('users').doc(id).get().toPromise();
  }
  _filter(formData:{nameSearch:any, gameSearch:Array<string>, casinoSearch:string} ){
    let nameStr = "";
    let game:Array<string> = [];   
    if(formData.gameSearch.length !== 0){
      formData.gameSearch.forEach(str => {
        str = str.toLocaleLowerCase();
        game.push(str);
      });
    }
    let name = formData.nameSearch;
      if(typeof name === 'object'){
       nameStr = name.nickName.toLowerCase();
      }else{
       nameStr = name.toLowerCase();
      }  
    let casino = formData.casinoSearch;
    return this.usersArr.filter(user =>
        user.nickName.toLowerCase().includes(nameStr) &&  
        (game.length === 0 || this.checkGames(game, user)) &&  
        (casino.length === 0 || user.casino === casino)
    );
  }

  checkGames(games:Array<string>, user:any){
    let passing = true;
    games.forEach(str => {
      if(user[str] !== true){
        passing = false;
      }
    })
    return passing;
  }

  removeAdmin(){
     this.usersArr = this.allArr.filter(user => user.role === "user");
  }

  async updateUserData(data:any, id:any){
    await this.afs.collection('users').doc(id).update(data); 
  } 
  async updateUserSchedule(data:any, id:any){
    await this.afs.collection('users').doc(id).collection('schedule').doc(id).set({schedule: data});
  }
  async getUserSchedule(id:any){
    return await this.afs.collection('users').doc(id).collection('schedule').doc(id).get().toPromise();
  }
  async deleteUser(email:any, id:any){
    const callable =  this.fns.httpsCallable('deleteUser');
    await callable({ email: email }).toPromise().then(async ()=>{
      try{
        await this.afs.collection('users').doc(id).collection('schedule').doc(id).delete();
        await this.afs.collection('users').doc(id).delete();
      }catch(error){
        console.log(error);
      }
    }).then(()=>{
      this.allArr=[];
    })
  }

}

