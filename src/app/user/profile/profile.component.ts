import { Component, OnInit} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, ValidationErrors, ValidatorFn } from '@angular/forms';
import { UserService } from '../user.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  loading:boolean = false;
  fileAttr = 'Изберете снимка';
  imageSrc!: any;
  form!: FormGroup;
  submitted = false;
  imgPath!: any;
  imgSize: number = 0;
  imgIsValid: boolean = false;
  constructor( 
    private formBuilder: FormBuilder, 
    private us: UserService
    ) { }

  ngOnInit(): void {

    this.form = this.formBuilder.group(
      {
        img: [null],
        nickName: ['', [Validators.required]],
        fullName: ['', [Validators.required]],
        phone: ['', [Validators.required]],
        imageSrc: ['', [ this.imgFileBig()]],
      },
    );
    this.fillForm();
  }
  
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;  
  }


  async fillForm(){
    const user = JSON.parse(localStorage.getItem('user')!);
    if(user){  
      console.log(user.photoURL);
      
        if(user.photoURL){
          this.imageSrc = user.photoURL;
          this.imgIsValid = true;
          this.form.patchValue({
            img: this.imageSrc
          });
        }
        if(user.displayName !== undefined){
          this.form.patchValue({
            fullName: user.displayName
          });
        }
      } 
      await this.us.userInfo().then(result => {
        const data:any =  result.data();
        if(data.nickName !== undefined){
          this.form.patchValue({
            nickName: data.nickName
          });
        }
      })
    }
  


  uploadFileEvt(e: any) {

    if (e.target.files && e.target.files[0]) {
      this.imgPath = e.target.files[0];
      this.imgSize = Number(e.target.files[0].size);
      this.form.get('imageSrc')!.updateValueAndValidity();
      this.imgIsValid = false;
      
      
      if(this.form.get('imageSrc')!.valid){
        console.log(this.imgPath);
        this.imgIsValid = true;
        const file = e.target.files[0];
        this.form.patchValue({
          img: file
        });
        const reader = new FileReader();
        reader.onload = () => {
          this.imageSrc = reader.result as string;
        }
        reader.readAsDataURL(file)
      }
    } else { 
      this.imgIsValid = false;
      this.fileAttr = 'Изберете снимка';
    }
  }

  async onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    const data = this.form.value;   
    if(this.imgPath === undefined){
      this.loading = true;
      await this.us.UpdateProfile("", data).then(()=>{
        this.loading = false;
        console.log('finished');
      });
    }else{
      this.loading = true;
      await this.us.UpdateProfile(this.imgPath, data).then(()=>{
        this.loading = false;
        console.log('finished');
      });
    }
   
    
  }
  imgFileBig(): ValidatorFn {  
      return (control: AbstractControl): ValidationErrors | null =>  {
        return (this.imgSize < 999999) ? null : {fileTooBig: control.value};
      }
  }
}
