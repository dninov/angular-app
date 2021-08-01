import { Component, OnInit} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, ValidationErrors, ValidatorFn } from '@angular/forms';
import { AdminService } from '../admin.service';
import { animations } from '../../utils/animations';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
  animations: [animations]
})
export class UserDetailsComponent implements OnInit {
  id:any;
  loading:boolean = false;
  form!: FormGroup;
  casinos:Array<string> =[ 'Casino1', 'Casino2', 'Casino3'];
  constructor( 
    private readonly route: ActivatedRoute,
    private formBuilder: FormBuilder, 
    private adminService: AdminService
    ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("uid");
    const data:any =  this.adminService.userInfo(this.id);
    console.log(data);
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
    this.fillForm(data);
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
  


  async onSubmit() {
    
    if (this.form.invalid) {
      return;
    }
    const data = this.form.value;   
    
  console.log(data);
  
  }

}
