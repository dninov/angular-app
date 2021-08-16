import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { animations } from '../../utils/animations';
import { ActivatedRoute, Router } from '@angular/router';
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
  ) { }

  ngOnInit(): void {
    this.scrollToBottom();
    this.id = this.route.snapshot.paramMap.get("uid");
    this.adminService.getUser(this.id).then(result=>{
      this.loading = false;
      this.userData = result.data();
    }).catch(error=> console.log(error));
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
 