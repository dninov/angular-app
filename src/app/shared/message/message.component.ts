import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ChatMessage } from '../chat.message.model';
import { Store } from '@ngrx/store';
import { State } from 'src/app/app.reducer';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user.model';
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit, OnDestroy {
  @Input() chatMessage!: any;
  id:any;
  user$!: Observable<User>;
  userSub!: Subscription;
  user!: any;
  constructor(
    private authService: AuthService,
    private store: Store<State>
  ) { }

  ngOnInit(): void {
    this.user$ = this.store.select(store=> store.auth.user);
    this.userSub = this.user$.subscribe((userData:any)=>{
      if(userData !== undefined){
        this.user = userData;
        this.id = this.user.uid;
      }
    })
  }
  ngOnDestroy(){

  }
}
