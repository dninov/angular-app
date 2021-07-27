import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
allArr:Array<any> = [];
usersArr:Array<any>=[];
  constructor(
    private afs: AngularFirestore,
  ) { }

  ngOnInit(): void {
    this.getAllUsers();
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

}
