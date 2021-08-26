import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formFilter'
})
export class FormFilterPipe implements PipeTransform {
  checkGames(games:Array<string>, user:any){
    let passing = true;
    games.forEach(str => {
      if(user[str] !== true){
        passing = false;
      }
    })
    return passing;
  }
  transform(value: any, formData:any): any{
    if (value !== null && value !== undefined){
      let nameStr = "";
      let game:Array<string> = [];   
      if(formData.gameSearch.length !== 0){
        formData.gameSearch.forEach((str:any) => {
          str = str.toLocaleLowerCase();
          game.push(str);
        });
      }
      let name = formData.nameSearch;
        if(typeof name === 'object'){
         nameStr = name.nickName.toLowerCase();
        }else{
         nameStr = name.toLowerCase();
        }  
      let casino = formData.casinoSearch;
      return value.filter((user:any) =>
          user.nickName.toLowerCase().includes(nameStr) &&  
          (game.length === 0 || this.checkGames(game, user)) &&  
          (casino.length === 0 || user.casino === casino)
      );
    }
  } 
}
