import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { animations } from '../../utils/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  animations: [animations]
})
export class ChatComponent implements OnInit,  AfterViewInit, OnDestroy{
  @ViewChild('chat') private feedContainer!: ElementRef;

  id:any;
  loading:boolean = true; 
  userData:any;
  userSub!: Subscription;
  constructor(
    private readonly route: ActivatedRoute,
    private router: Router,
    private store: Store<State>
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.scrollToBottom();
    this.id = this.route.snapshot.paramMap.get("uid");
    let allUsers = this.store.select(store=> store.admin.list);
    this.userSub = allUsers.subscribe((users:any)=>{
      this.userData = users.filter((user:any) => user.uid == this.id);
      this.loading = false;
    });
  }
  ngAfterViewInit(){
    this.scrollToBottom();
  }
  back(){
    this.router.navigate(['admin-dashboard']);
  }
  scrollToBottom(): void{
    try {
      this.feedContainer.nativeElement.scrollTop = this.feedContainer.nativeElement.scrollHeight;
    } catch(err) { }    
  }
  ngOnDestroy():void{
    this.userSub.unsubscribe();
  }
}
 