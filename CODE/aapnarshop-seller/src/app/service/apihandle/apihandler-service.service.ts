import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class ApihandlerServiceService {
  _endpoint: any;

  constructor(
    private httpClient: HttpClient,
    private configService: ConfigService) { }

  async loadEndPoint(_endpointTitle: any) {
    var res: any;
    this._endpoint = await this.httpClient
      .get('/assets/endpoints/endpoints.json')
      .toPromise()
      .then((result: any) => {
        Object.keys(result).forEach(key => {
          if (key == _endpointTitle) {
            var _host = this.configService.getServerUrl();
            res = _host + result[key];
          }
        });
      })
      .catch((error: HttpErrorResponse) => {
        res = '';
        console.error(error);
      });
    return res;
  }
}
