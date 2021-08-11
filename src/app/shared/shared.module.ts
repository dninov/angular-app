import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { ChatFormComponent } from './chat-form/chat-form.component';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { FeedComponent } from './feed/feed.component';
import { MessageComponent } from './message/message.component'


@NgModule({
  declarations: [
    LoaderComponent,
    ChatFormComponent,
    ChatroomComponent,
    FeedComponent,
    MessageComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    LoaderComponent,
    ChatFormComponent,
    ChatroomComponent,
    FeedComponent,
    MessageComponent
  ]
})
export class SharedModule { }
