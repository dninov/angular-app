import { error } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  allArr:Array<any> = [];
  usersArr:Array<any>=[];
 
  constructor(
    private  afs:AngularFirestore,
  ) { }
  async getAllUsers(){
    if( this.allArr.length === 0){
      return  await this.afs.collection('users').get().toPromise().then( record=>{
        record.docs.forEach( entry => {
          this.allArr.push(entry.data());
        });  
      }).then(r=>{this.removeAdmin()})
    }else{
      return
    }
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

  async userInfo(uid:any){
    if(this.usersArr.length > 0){
      return this.usersArr.filter(user => user.uid === uid);
    }else{
      return await this.getAllUsers()
    }
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

}

