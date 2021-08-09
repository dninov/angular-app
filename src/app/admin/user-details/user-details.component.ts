import { Component, OnInit} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../admin.service';
import { animations } from '../../utils/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
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
    private readonly route: ActivatedRoute,
    private formBuilder: FormBuilder, 
    private adminService: AdminService,
    private router: Router,

    ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("uid");
    this.adminService.getAllUsers().then(()=>{
      this.loading = false;
      const data = this.adminService.allArr.filter(user=> user.uid === this.id);
      this.userData = data[0];
      this.fillForm(data[0]);
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
    console.log(data);
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
    console.log('mail');
  }
  async deleteClicked(){
    console.log(this.userData[0]);
    
    this.loading = true;
    await this.adminService.deleteUser(this.userData[0].email, this.userData[0].uid).then(()=>{
       this.loading = false;
       this.router.navigateByUrl('/admin-dashboard');
     }).catch(error=> console.log(error));
  }



}
