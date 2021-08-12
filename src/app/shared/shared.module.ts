import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { ChatFormComponent } from './chat-form/chat-form.component';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { FeedComponent } from './feed/feed.component';
import { MessageComponent } from './message/message.component'
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { SortPipe } from './feed/sort.pipe';
import { MaterialModue } from '../material.module';
@NgModule({
  declarations: [
    LoaderComponent,
    ChatFormComponent,
    ChatroomComponent,
    FeedComponent,
    MessageComponent,
    SortPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModue
  ],
  providers:[
    DatePipe,
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
