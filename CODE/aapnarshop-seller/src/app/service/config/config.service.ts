import { HttpBackend, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  localStorage: any;
  _appConfig: any;

  private httpClient: HttpClient;

  constructor(private handler: HttpBackend) { }
  /*
    HttpBackend doesn't wake interceptor, hence used here but HttpClient does
  */
  async loadAppConfig() {
    this.httpClient = new HttpClient(this.handler);

    return await this.httpClient
      .get('/assets/config/config.json')
      .toPromise()
      .then((result: any) => {
        this._appConfig = result;
      })
      .catch((error: HttpErrorResponse) => {
        this._appConfig = '';
        console.error(error);
      });
  }

  getServerUrl(): string {
    return this._appConfig.uri;
  }

  getServerUsername(): string {
    return this._appConfig.username;
  }

  getServerPassword(): string {
    return this._appConfig.password;
  }

  getServerDefaultLang(): string {
    return this._appConfig.default_language;
  }

  getServerDefaultName(): string {
    return this._appConfig.default_name;
  }

  getServerDefaultEmail(): string {
    return this._appConfig.default_email;
  }

  getServerDefaultMobile(): string {
    return this._appConfig.default_mobile;
  }

  getClientData(_input: any) {
    var result = '';
    if (localStorage.getItem('eshops_buyer') !== null) {
      let eshops_vars = localStorage.getItem('eshops_buyer');
      let eshops = JSON.parse(eshops_vars);
      Object.keys(eshops).forEach(key => {
        if (key == _input) {
          result = eshops[_input];
        }
      });
    } else {
      result = '';
      console.error('Local Storage Not Found');
    }
    return result;
  }

  setClientData(_user: any, _email: any, _phone: any, _ln: any) {
    let eshops_vars = {
      username: _user,
      email: _email,
      phone: _phone,
      ln: _ln
    };
    localStorage.setItem('eshops_buyer', JSON.stringify(eshops_vars));
  }
}