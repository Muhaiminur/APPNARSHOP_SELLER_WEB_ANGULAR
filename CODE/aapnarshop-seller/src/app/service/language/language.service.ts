import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  languageConfig: any;
  _languageType: any = 'bn'; //get the value from local storage  

  constructor(private httpClient: HttpClient) { }

  async loadLanguageConfig(_input: any) {
    var res = '';

    this.languageConfig = await this.httpClient
      .get('/assets/language/language.json')
      .toPromise()
      .then((result: any) => {
        Object.keys(result).forEach(key => {
          if (key == _input) {
            if (this._languageType == 'bn') {
              res = `<font face='Solaimanlipi'>` + result[key][this._languageType] + `</font>`;
            } else {
              res = result[key][this._languageType];
            }
          }
        });
      })
      .catch((error: HttpErrorResponse) => {
        console.error(error);
      });
    return res;
  }
}
