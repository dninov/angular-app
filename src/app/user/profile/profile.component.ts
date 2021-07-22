import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import Validation from '../../utils/validation';
import { AuthService } from '../../auth/auth.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @ViewChild('fileInput') fileInput!: ElementRef;
  fileAttr = 'Choose File';
  form!: FormGroup;
  submitted = false;
  imgPath: string = "";
  imgSize: number = 0;

  constructor( 
    private formBuilder: FormBuilder, 
    private authService: AuthService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        nickName: ['', [Validators.required]],
        fullName: ['', [Validators.required]],
        phone: ['', [Validators.required]],
        imgPath: ['', [Validators.required]],
      },
      { validator: this.imgFileBig }
    );
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;  
  }
  uploadFileEvt(imgFile: any) {
    if (imgFile.target.files && imgFile.target.files[0]) {
      this.fileAttr = imgFile.target.files[0].name ;
      this.imgPath = imgFile.target.files[0];
      this.imgSize = imgFile.target.files[0].size;
      console.log(imgFile.target.files[0].size);
      
    } else {
      this.fileAttr = 'Choose File';
    }
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    const data = this.form.value;    
  }
  imgFileBig(g: FormGroup) {
    console.log(g.get('imgPath')?.value.size);
    
    
   // return this.imgSize < 999999;
  }
}
