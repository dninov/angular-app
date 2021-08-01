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



  // async loadUsers(){
  //   this.getAllUsers().then(()=>{   
  //     this.filteredArr = this.usersArr;
  //     this.form.valueChanges.subscribe(formData=>{
  //        this._filter(formData)
  //      });
     
  //   });
  // }


  _filter(formData:{nameSearch:any, gameSearch:Array<string>}){
    
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
       
    return this.usersArr.filter(user =>
        user.nickName.toLowerCase().includes(nameStr) &&  
        (game.length === 0 || this.checkGames(game, user))
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
  async getAllUsers(){
    this.allArr = [];
    if( this.allArr.length === 0){
      return  this.afs.collection('users').get().toPromise().then( record=>{
        record.docs.forEach( entry => {
          console.log(entry.data())
          this.allArr.push(entry.data())
        });  
      }).then(r=>{this.removeAdmin()})
    }else{
      return
    }

  }
  removeAdmin(){
     this.usersArr = this.allArr.filter(user => user.role === "user");
  }

  userInfo(id:any){
    return this.usersArr.filter(user => user.id === id);
  }
  updateUserData(data:any, id:any){
    this.afs.collection('users').doc(id).update(data);
  }


}

