import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  roleList: string[] = ['Администратор', 'Потребител'];
  
  constructor(
    private formBuilder: FormBuilder, 
    private authService: AuthService) {
    
   }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
        ], 
        rePass: ['', Validators.required, [this.checkPasswords()]],
        roles: ['', [Validators.required]],
      },
    );
  }
 
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;  
  }
  checkPasswords(): ValidatorFn {  
    let pass = this.f.controls.get('password')?.value;
   // let confirmPass = this.form.controls['rePass'];
    return (control: AbstractControl): ValidationErrors | null =>  {
      return pass === 'confirmPass' ? null : {notSame: control.value};
  }
}
  // checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => { 
  //   let pass = this.form.get('password')!.value;
  //   let confirmPass = this.form.get('rePass')!.value;
  //   return pass === confirmPass ? null : { notSame: true }
  // }
  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    const data = this.form.value;    
    this.authService.emailSignup(data.email, data.password, data.roles);
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
}


