import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { animations } from '../../utils/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from 'src/app/app.reducer';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  animations: [animations]
})
export class ChatComponent implements OnInit,  AfterViewInit{
  @ViewChild('chat') private feedContainer!: ElementRef;

  id:any;
  loading:boolean = true; 
  userData:any;

  constructor(
    private readonly route: ActivatedRoute,
    private adminService: AdminService,
    private router: Router,
    private store: Store<State>
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.scrollToBottom();
    this.id = this.route.snapshot.paramMap.get("uid");
    // this.adminService.getUser(this.id).then(result=>{
    //   this.loading = false;
    //   this.userData = result.data();
    // }).catch(error=> console.log(error));
    let allUsers = this.store.select(store=> store.admin.list);
    allUsers.subscribe((users:any)=>{
      this.userData = users.filter((user:any) => user.uid == this.id);
      this.loading = false;
      console.log(this.userData);
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
}
 