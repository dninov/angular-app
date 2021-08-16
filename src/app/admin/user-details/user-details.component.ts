import { Component, OnInit} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../admin.service';
import { animations } from '../../utils/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
@Component({
  selector: 'app-profile',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
  animations: [animations]
})
export class UserDetailsComponent implements OnInit {
  id:any;
  loading:boolean = true; 
  form!: FormGroup;
  userData:any;
  casinos:Array<string> = [ 'Casino1', 'Casino2', 'Casino3']; 

  constructor( 
    public dialog: MatDialog,
    private readonly route: ActivatedRoute,
    private formBuilder: FormBuilder, 
    private adminService: AdminService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("uid");
    this.adminService.getUser(this.id).then(result=>{
      this.loading = false;
      this.userData = result.data();
      this.fillForm(this.userData);
    }).catch(error=> console.log(error));

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
    this.adminService.deleteUser(this.userData.email, this.userData.uid).then(()=>{
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



}
