import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { animations } from '../../utils/animations'

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
  animations: [animations]
})
export class UsersListComponent implements OnInit {
gamesArr:Array<string> = ['AR', 'Poker', 'Blackjack', 'Baccart'];
allArr:Array<any> = [];
usersArr:Array<any>=[];
filteredArr!:Array<any>;
form!: FormGroup;

  constructor(
    private afs: AngularFirestore,
    private formBuilder: FormBuilder, 
  ) { }

  ngOnInit(): void {

    this.form = this.formBuilder.group(
      {
        nameSearch: [''],
        gameSearch: [''],
      },
    );
     this.getAllUsers().then(()=>{   
      this.filteredArr = this.usersArr;
      this.form.valueChanges.subscribe(formData=>{
         this._filter(formData)
       });
     
    });
  }
  
   _filter(formData:{nameSearch:any, gameSearch:string}): void{
    console.log(formData.gameSearch.toLocaleLowerCase().length, "and", formData.nameSearch.length);

    let nameStr = "";
    let game = formData.gameSearch.toLocaleLowerCase();   
    let name = formData.nameSearch;
      if(typeof name === 'object'){
       nameStr = name.nickName.toLowerCase();
      }else{
       nameStr = name;
      }  
      console.log(nameStr.length, "and", game.length);
      if(nameStr.length !== 0 && game.length !== 0){ 
        this.filteredArr = this.usersArr.filter(user => {
          return (user.nickName).toLowerCase().includes(nameStr) && user[game] == true;
        })
      }
      if(nameStr.length !==0 && game.length === 0){
              this.filteredArr = this.usersArr.filter(user => {
                return (user.nickName).toLowerCase().includes(nameStr);
              })
        }
      if(nameStr.length === 0 && game.length !== 0 ){ 
        this.filteredArr = this.usersArr.filter(user => {
          return (user.nickName).toLowerCase().includes(nameStr) && user[game] == true;
        })
      }

      if(nameStr.length == 0 && game.length == 0){ 
        console.log('3');
        
         this.filteredArr = this.usersArr
      }

      


  }
  async getAllUsers(){
    return  this.afs.collection('users').get().toPromise().then( record=>{
      record.docs.forEach( entry => {
        this.allArr.push(entry.data())
      });  
    }).then(r=>{this.removeAdmin()})
  }
  removeAdmin(){
    this.usersArr= this.allArr.filter(o=>o.hasOwnProperty('imgUrl'));
    console.log(this.usersArr);
  }
  autocompleteName(input:any){
    return input ? input.nickName : undefined
  }

}
