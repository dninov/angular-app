import { Component, OnInit,  OnDestroy} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { animations } from '../../utils/animations';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from 'src/app/app.reducer';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
  animations: [animations]
})
export class UsersListComponent implements OnInit, OnDestroy {
gamesArr:Array<string> = ['AR', 'Poker', 'Blackjack', 'Baccart'];
casinosArr:Array<string> = ['', 'Casino1', 'Casino2', 'Casino3'];
form!: FormGroup;
filteredArr:Array<any> =[];  
loading!: Observable<boolean>;
userArr:any;
storeUserArr!:Observable<Array<any>>;
formData:object={nameSearch:"", gameSearch:[], casinoSearch:""};
formSub!:Subscription;
  constructor(
    private formBuilder: FormBuilder, 
    private router: Router,
    private store: Store<State>
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        nameSearch: [''],
        gameSearch: [''],
        casinoSearch:[''],
      }, 
    );
    
   this.storeUserArr = this.store.select(store=> store.admin.list);
   this.loading = this.store.select(store=> store.admin.loading);;
   this.formSub = this.form.valueChanges.subscribe(formData=>{
      this.formData = formData;
    });
  }

  autocompleteName(input:any){
    return input ? input.nickName : undefined
  }
  onSelect(user:any){
    this.router.navigate(['admin-dashboard/user-details', user.uid]);
  }
  ngOnDestroy(){
    this.formSub.unsubscribe();
  }
}
