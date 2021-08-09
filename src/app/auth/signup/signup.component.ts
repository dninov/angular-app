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
  submitted = false;
  roleList: string[] = ['Администратор', 'Потребител'];
  subscr!:any;
  loading = true;
  emailTaken = false;

  constructor(
    private afAuth: AngularFireAuth,
    private formBuilder: FormBuilder, 
    private authService: AuthService,) {
   }

  ngOnInit(): void {
    this.loading = false;
    this.form = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email,  (c:any) => this.emailIsTaken(c)]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40),
          ]
        ], 
        rePass: ['', [Validators.required, (c:any) => this.checkPasswords(c)]],
        roles: ['', [Validators.required]],
      },

    );
    this.subscr = this.form?.valueChanges.subscribe(val=>{
      this.form.get('rePass')!.updateValueAndValidity();
    })
  }
 
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;  
  }
  
  checkPasswords(control: AbstractControl): ValidationErrors | null {  
    let pass = this.form?.controls.password.value;
    let confirmPass =  this.form?.controls.rePass.value;
    return (pass === confirmPass) ? null : { notSame: control.value };
  }
  emailIsTaken(control: AbstractControl): ValidationErrors | null {  
    return (!this.emailTaken) ? null : { isTaken: control.value };
  }
  
  onSubmit() {
    this.submitted = true;
    this.emailTaken = false;
    if (this.form.invalid) {
      return;
    }
    const data = this.form.value;    
    this.loading = true;
    this.afAuth.createUserWithEmailAndPassword(data.email, data.password)
    .then((result)=>{
      console.log(result.user?.uid);
      delete data.rePass;
      data.uid = result.user?.uid;
      this.authService.emailSignup(data);
    })
    .catch(error=>{
       if(error.code === 'auth/email-already-in-use'){
        this.loading = false;
        this.emailTaken = true;
        this.form.get('email')!.updateValueAndValidity();
        return 
      } 
    })
  }
  get errorMsg(): string {
    let errMsg = this.authService.errorMsg;
    console.log(errMsg);
    return errMsg
  }
  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
  ngOnDestroy(){
    this.subscr.unsubscribe()
  }
}


