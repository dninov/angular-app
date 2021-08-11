import { Data } from "@angular/router";

export class ChatMessage{
    $key?:string;
    email?:string;
    eserName?:string;
    message?:string;
    timeSend?:Data = new Date();
}