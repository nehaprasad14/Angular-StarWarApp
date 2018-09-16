import { Injectable } from '@angular/core';
import { Http , Response} from '@angular/http';
import { LogService } from './log.service';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
  export class StarWarServices {
    characters = [
      { name: 'Luke Skywalker', side: ''},
      { name: 'Darth Vader', side: ''}
    ];

    logService: LogService;
    http: Http;
    charactersChanged = new Subject<void>();

    constructor(logService: LogService, http: Http) {
      this.logService = logService;
      this.http = http;
    }

    fetchCharacters() {
      this.http.get('https://swapi.co/api/people')
        .pipe(map((response: Response) => {
          const data = response.json();
          console.log('## data is: ' + data);
          const extractedData = data.results;
          const extractedChars = extractedData.map((char) => {
            return { name: char.name , side: ''};
          });
          return extractedChars;
        }))
        .subscribe((exChars) => {
          this.characters = exChars;
          this.charactersChanged.next();
        });
    }

    getCharacters(chosenList) {
      if (chosenList === 'all') {
        return this.characters.slice();
      }

      return this.characters.filter((char) => {
        return char.side  === chosenList;
      });
    }

    onSideChosen(charInfo) {
      const pos = this.characters.findIndex((char) => {
        return char.name === charInfo.name;
      });
      this.characters[pos].side = charInfo.side;
      this.charactersChanged.next();
      this.logService.writeLog('Changed side of ' + charInfo.name + ' ,new side: ' + charInfo.side);
    }

    addCharacter(name, side) {
      const pos = this.characters.findIndex((char) => {
        return char.name === name;
      });

      if (pos !== -1) {
        return;
      }

      const newChar = { name: name, side: side};
      this.characters.push(newChar);
    }
  }


