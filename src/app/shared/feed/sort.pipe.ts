import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {
  private getTime(date?: Date) {
    return date != null ? new Date(date).getTime() : 0;
  }
  transform(value: any): any{
    if(value!==null){
     return value.sort((a:any,b:any) => {
        let date1 = new Date(a.messages.timeSent);
        let date2 = new Date(b.messages.timeSent);
        return this.getTime(date1) - this.getTime(date2);
      });
    }
  } 
}
