import { Component, OnInit,  HostListener} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { animations } from '../../utils/animations';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
  animations: [animations]
})
export class UsersListComponent implements OnInit {
gamesArr:Array<string> = ['AR', 'Poker', 'Blackjack', 'Baccart'];
casinosArr:Array<string> = ['', 'Casino1', 'Casino2', 'Casino3'];
form!: FormGroup;
filteredArr:Array<any> =[]; 
loading = true;
  constructor(
    private adminService: AdminService,
    private formBuilder: FormBuilder, 
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        nameSearch: [''],
        gameSearch: [''],
        casinoSearch:[''],
      }, 
    );
    this.adminService.getAllUsers().then((r)=>{
      this.loading = false;
      this.filteredArr = this.adminService.usersArr;
      this.form.valueChanges.subscribe(formData=>{
        this.filteredArr = this.adminService._filter(formData)
      });
    })
  }
  autocompleteName(input:any){
    return input ? input.nickName : undefined
  }
  onSelect(user:any){
    this.router.navigate(['admin-dashboard/user-details', user.uid]);
  }

}
