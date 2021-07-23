import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, ValidationErrors, ValidatorFn } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { DomSanitizer } from '@angular/platform-browser';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @ViewChild('fileInput') fileInput!: ElementRef;
  fileAttr = 'Изберете снимка';
  imageSrc: string = "";
  form!: FormGroup;
  submitted = false;
  imgPath!: any;
  imgFile!: File;
  imgSize: number = 0;
  imgIsValid: boolean = false;
  constructor( 
    private formBuilder: FormBuilder, 
    private authService: AuthService,
    private sanitizer: DomSanitizer,
    private as: AuthService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        img: [null],
        nickName: ['', [Validators.required]],
        fullName: ['', [Validators.required]],
        phone: ['', [Validators.required]],
        imgPath: ['', [Validators.required, this.imgFileBig()]],
      },
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;  
  }
  uploadFileEvt(e: any) {
    if (e.target.files && e.target.files[0]) {
      
      this.imgPath = e.target.files[0];
      this.imgFile =  e.target.files[0];
      this.imgSize = Number(e.target.files[0].size);
      this.form.get('imgPath')!.updateValueAndValidity();
      this.imgIsValid = false;
      
      if(this.form.get('imgPath')!.valid){
        this.imgIsValid = true;
        const file = e.target.files[0];
        this.form.patchValue({
          img: file
        });
        const reader = new FileReader();
        reader.onload = () => {
          this.imgPath = reader.result as string;
        }
        reader.readAsDataURL(file)
      }
    } else {
      this.fileAttr = 'Choose File';
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    const data = this.form.value;   
    console.log(data);
    const imageUp = this.as.uploadImg(this.imgFile);
  }
  imgFileBig(): ValidatorFn {  
      return (control: AbstractControl): ValidationErrors | null =>  {
        return !(this.imgSize < 999999) ? {fileTooBig: control.value} : null;
      }
  }

}
