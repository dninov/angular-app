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
        let date1 = (a.timeSent).toDate();
        let date2 = (b.timeSent).toDate();
        return this.getTime(date1) - this.getTime(date2);
      });
    }
  } 
}
