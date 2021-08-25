import { Component, OnInit, OnDestroy} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../admin.service';
import { animations } from '../../utils/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { Store } from '@ngrx/store';
import { State } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
  animations: [animations]
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  id:any;
  loading:boolean = true; 
  form!: FormGroup;
  userData:any;
  casinos:Array<string> = [ 'Casino1', 'Casino2', 'Casino3']; 
  allUsersSub!: Subscription;

  constructor( 
    public dialog: MatDialog,
    private readonly route: ActivatedRoute,
    private formBuilder: FormBuilder, 
    private adminService: AdminService,
    private router: Router,
    private store: Store<State>
    ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("uid");
    this.form = this.formBuilder.group(
      {
        casino: ['', [Validators.required]],
        ar:[false],
        poker:[false],
        blackjack:[false],
        baccart:[false],
        startDate:['']
      },
    );
    let allUsers = this.store.select(store=> store.admin.list);
    this.allUsersSub = allUsers.subscribe((users:any)=>{
      this.userData = users.filter((user:any) => user.uid == this.id);
      this.loading = false;
      this.fillForm(this.userData[0]);
    });
  }
  
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;  
  }

  fillForm(data:any){
    for(const key in data){
        if((this.form.get(key)!) !== null){
          if(key === "startDate"){
            this.form.patchValue({
              [key] : data[key].toDate()
            });
          }else{
            this.form.patchValue({
              [key] : data[key]
            });
          }
        }
      }
    }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    const data = this.form.value;  
    this.loading = true; 
    this.adminService.updateUserData(data, this.id).then(()=>{
    this.loading = false;
    })
  }
  back(){
    this.router.navigate(['admin-dashboard']);
  }
  scheduleClicked(){
    this.router.navigate(['admin-dashboard/schedule-builder', this.id]);
  }
  mailClicked(){
    this.router.navigate(['admin-dashboard/chat', this.id]); 
  }
  deleteClicked(){
    this.loading = true;
    console.log(this.userData[0].email,' ' ,this.userData[0].uid);
    
    this.adminService.deleteUser(this.userData[0].email, this.userData[0].uid).then(()=>{
       this.loading = false;
       this.router.navigateByUrl('/admin-dashboard');
     }).catch(error=> console.log(error));
  }

  openDialog(){
    let dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe(result =>{
      if(result === "yes"){
        this.deleteClicked();
      }else{
        return 
      }
    })
  }
ngOnDestroy():void{
  this.allUsersSub.unsubscribe();
}


}
