import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import Validation from '../../utils/validation';
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
        rePass: ['', Validators.required],
        roles: ['', [Validators.required]],
      },
      {
        validators: [Validation.match('password', 'rePass')]
      }
    );
  }
 
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;  
  }

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


