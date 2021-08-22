import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { AuthService } from '../auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form!: FormGroup;
  roleList: string[] = ['Администратор', 'Потребител'];
  passSubscr!:any;
  emailSubscr!:any;
  loading = true;
  emailTaken = false;
  emailNotValid = false;

  constructor(
    private afAuth: AngularFireAuth,
    private formBuilder: FormBuilder, 
    private authService: AuthService,) {
   }

  ngOnInit(): void {
    this.loading = false;
    //BUILD UP FORM GROUP
    this.form = this.formBuilder.group(
      {
        email: ['', [ Validators.required, Validators.email, (c:any) => this.emailIsTaken(c), (c:any) => this.emailIsNotValid(c)]],
        password: ['',[ Validators.required, Validators.minLength(6), Validators.maxLength(40)]], 
        rePass: ['', [Validators.required, (c:any) => this.checkPasswords(c)]],
        roles: ['', [Validators.required]],
      },
    );
    //SUBSCRIBE FOR VALIDATION PURPOSES
    this.passSubscr = this.form?.controls.password.valueChanges.subscribe(val=>{
      this.form.get('rePass')!.updateValueAndValidity();
    })
    this.emailSubscr = this.form?.controls.email.valueChanges.subscribe(val=>{
     if (val === ""){
        this.emailTaken = false;
        this.emailNotValid = false;
      }
    })
  }
 
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;  
  }
  //VALIDATION FUNCTIONS
  checkPasswords(control: AbstractControl): ValidationErrors | null {  
    let pass = this.form?.controls.password.value;
    let confirmPass =  this.form?.controls.rePass.value;
    return (pass === confirmPass) ? null : { notSame: control.value };
  }
  emailIsTaken(control: AbstractControl): ValidationErrors | null {  
    return (!this.emailTaken) ? null : { isTaken: control.value };
  }
  emailIsNotValid(control: AbstractControl): ValidationErrors | null {  
    return (!this.emailNotValid) ? null : { isNotValid: control.value };
  }
  // FORM SUBMITTED
  onSubmit() {
    this.emailTaken = false;
    if (this.form.invalid) {
      return;
    }
    const data = this.form.value;    
    this.loading = true;
    this.afAuth.createUserWithEmailAndPassword(data.email, data.password).then((result)=>{
      delete data.rePass;
      data.uid = result.user?.uid;
      if(data.roles === "Администратор"){
        data.roles = "admin"
      }else{
        data.roles = "user"
      }
      this.authService.emailSignup(data);
    }).catch(error=>{
       if(error.code === 'auth/email-already-in-use'){
        this.loading = false;
        console.log(this.loading);
        this.emailTaken = true;
        this.form.get('email')!.updateValueAndValidity();
        return 
      }else if(error.code === 'auth/invalid-email') {
        this.loading = false;
        this.emailNotValid = true;
        return
      }
      this.loading = false;
      return
    })
  }

  ngOnDestroy(){
    this.passSubscr.unsubscribe();
    this.emailSubscr.unsubscribe();
  }
}


