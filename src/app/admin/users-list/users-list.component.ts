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
         console.log(formData);
         this._filter(formData)
       });
     
    });
  }
  
   _filter(formData:{nameSearch:any, gameSearch:string}): void{
    let nameStr = "";

      if(typeof formData.nameSearch === 'object'){
       nameStr = formData.nameSearch.nickName.toLowerCase();
      }else{
       nameStr = formData.nameSearch.toLowerCase();
      }  
      this.filteredArr = this.filteredArr.filter(user => {
        return (user.nickName).toLowerCase().includes(nameStr);
      })
      if(formData.gameSearch){
        const game = formData.gameSearch.toLocaleLowerCase();   
        this.filteredArr =  this.filteredArr.filter(user => {
          console.log(user);
          return user[game] === true;
        })
      }
    console.log(this.filteredArr);
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
