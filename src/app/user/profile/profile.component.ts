import { Component, OnInit, OnDestroy, Input} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, ValidationErrors, ValidatorFn } from '@angular/forms';
import { UserService } from '../user.service';
import { animations } from '../../utils/animations';
import { Store } from '@ngrx/store';
import { State } from 'src/app/app.reducer';
import { LoadUserAction } from 'src/app/auth/store/auth.actions';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  animations: [animations]
})
export class ProfileComponent implements OnInit, OnDestroy {
  loading:boolean = false;
  imageSrc:string = '';
  form!: FormGroup;
  submitted = false; 
  imgPath!: any;
  imgSize: number = 0;
  imgIsValid: boolean = true;
  defaultImage: boolean = true;
  user$!: Observable<any>;
  userSub!: Subscription;
  user!: any;
  constructor( 
    private formBuilder: FormBuilder, 
    private authService: AuthService,
    private userService: UserService,
    private store: Store<State>,
    ) { }

  ngOnInit(): void {
    this.loading = true;
    this.form = this.formBuilder.group(
      {
        img: [null],
        nickName: ['', [Validators.required]],
        fullName: ['', [Validators.required]],
        phoneNumber: ['', [Validators.required]],
        imageSrc: [''],
      },
    );
      this.user$ = this.store.select(store=> store.auth.user);
      this.userSub = this.user$.subscribe((userData:any)=>{
        console.log('Profile');
        
        if(userData !== undefined){
          if(Object.keys(userData).length === 0){
              console.log('Profile no User');
              this.authService.reloadSub();
          }else{
            console.log('Profile Has user',userData);
              this.user = userData;
              this.loading = false;
              this.fillForm();
          }
        }
      })
  }
  
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;  
  }

  fillForm(){
    this.imageSrc =  this.user.imgUrl;
    if(this.imageSrc === '../../../assets/user-icon.jpg'){
      this.defaultImage = true;
    }else{
      this.defaultImage = false;
    }
    for(const key in this.user){
      if((this.form.get(key)!) !== null){
        this.form.patchValue({
          [key] : this.user[key]
        });
      }
    }
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
    if(this.imgPath === undefined){
      this.loading = true;
      await this.userService.UpdateProfile(this.user.uid, this.imageSrc, data).then(()=>{
      this.loading = false;
      }).catch(err=>console.log(err));
    }else{
      this.loading = true;
      await this.userService.UpdateProfile(this.user.uid, this.imgPath, data).then(()=>{
        this.loading = false;
      }).catch(err=>{console.log(err)});
    }
  }

  imgFileBig() {
    return this.imgSize < 999999    
  }
  changeImgDefault(){
    this.defaultImage = true;
    this.imageSrc =  '../../../assets/user-icon.jpg';
  }
  ngOnDestroy(){
    // this.loggedout = true;
    this.userSub.unsubscribe();
  }
}
