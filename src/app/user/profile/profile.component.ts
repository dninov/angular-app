import { Component, OnInit} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, ValidationErrors, ValidatorFn } from '@angular/forms';
import { UserService } from '../user.service';
import { animations } from '../../utils/animations';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  animations: [animations]
})
export class ProfileComponent implements OnInit {
  loading:boolean = false;
  imageSrc:string = '';
  form!: FormGroup;
  submitted = false;
  imgPath!: any;
  imgSize: number = 0;
  imgIsValid: boolean = true;
  defaultImage: boolean = true;
  user: any;
  constructor( 
    private formBuilder: FormBuilder, 
    private userService: UserService
    ) { }

  ngOnInit(): void {
    
    this.form = this.formBuilder.group(
      {
        img: [null],
        nickName: ['', [Validators.required]],
        fullName: ['', [Validators.required]],
        phoneNumber: ['', [Validators.required]],
        imageSrc: [''],
      },
    );
    this.fillForm();
  }
  
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;  
  }


  fillForm(){
    this.user = JSON.parse(localStorage.getItem('user')!); 
    if( this.user){  
        if(!this.user.photoURL){
          this.user.photoURL = '../../../assets/user-icon.jpg';
        }
        if( this.user.photoURL !== '../../../assets/user-icon.jpg'){
          this.imageSrc =  this.user.photoURL;
          this.defaultImage = false;
          this.form.patchValue({
            img: this.imageSrc
          });
        }else{
 
        }
        if( this.user.displayName !== undefined){
          this.form.patchValue({
            fullName:  this.user.displayName
          });
        }
      } 
      this.userService.userInfo().then(result => {
        const data:any = result.data();
        this.user = data;
        
        for(const key in data){
          if((this.form.get(key)!) !== null){
            this.form.patchValue({
              [key] : data[key]
            });
          }
        }
      }).catch(err=>console.log(err));
    }
  


  chooseFileEvt(e: any) {
    if (e.target.files && e.target.files[0]) {
      this.imgPath = e.target.files[0];
      this.imgSize = Number(e.target.files[0].size);
      this.imgIsValid = false;
      if(this.imgFileBig()){
        this.imgIsValid = true;
        this.defaultImage = false;
        const file = e.target.files[0];
        this.form.patchValue({
          img: file
        });
        const reader = new FileReader();
        reader.onload = () => {
          this.imageSrc = reader.result as string;
        }
        reader.readAsDataURL(file)
      }else{
        this.imgPath = "";
        this.defaultImage = true;
      }
    }
  }

  async onSubmit() {
    this.submitted = true; 
    if (this.form.invalid) {
      return;
    }
    const data = this.form.value;   
    
    if(this.imgPath === undefined || this.defaultImage){
      this.loading = true;
      await this.userService.UpdateProfile('', data).then(()=>{
      this.loading = false;
      });
    }else{
      this.loading = true;
      await this.userService.UpdateProfile(this.imgPath, data).then(()=>{
        this.loading = false;
      });
    }
  }

  imgFileBig() {
    return this.imgSize < 999999    
  }
  changeImgDefault(){
    this.defaultImage = true;
  }
}
