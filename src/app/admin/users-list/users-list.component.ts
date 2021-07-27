import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
allArr:Array<any> = [];
usersArr:Array<any>=[];
filteredArr:Array<any>=[];
fControl = new FormControl();
fOptions!: Observable<object[]>;
  constructor(
    private afs: AngularFirestore,
  ) { }

  ngOnInit(): void {

     this.getAllUsers().then(()=>{       
       this.fControl.valueChanges.subscribe(v=>{this._filter(v);})
    })
    //  this.fOptions = this.fControl.valueChanges.pipe(
    //   startWith(''),
    //   map(v=> this._filter(v))
    // );
  }
  
   _filter(v: string): void{
   
    const filterValue:string = v.toLowerCase();
    this.filteredArr = this.usersArr.filter(user => {
      console.log(typeof filterValue);
      
      (user.nickName).toString().toLowerCase().includes(filterValue);
    })
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
