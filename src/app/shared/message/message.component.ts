import { Component, OnInit, Input } from '@angular/core';
import { ChatMessage } from '../chat.message.model';
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  @Input() chatMessage!: any;
  id:any;
  constructor() { }

  ngOnInit(): void {
    // const user = JSON.parse(localStorage.getItem('user')!); 
    // this.id = user.uid;
  }

}
