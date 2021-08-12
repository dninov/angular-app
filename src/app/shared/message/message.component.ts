import { Component, OnInit, Input } from '@angular/core';
import { ChatMessage } from '../chat.message.model';
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  @Input() chatMessage!: any;
  // userEmail!: string;
  // messageContent!: string;
  // timeStamp!: string;

  constructor() { }

  ngOnInit(): void {
    //this.messageContent = this.chatMessage.message;
  }

}
