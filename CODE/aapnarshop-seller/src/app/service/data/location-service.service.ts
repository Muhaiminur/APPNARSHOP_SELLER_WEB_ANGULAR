import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../config.service';

@Injectable({
  providedIn: 'root'
})
export class LocationServiceService {

  constructor(private http: HttpClient, private appConfig: ConfigService) {
    const url = this.appConfig.getServerUrl() + "fbmobile/divlist";
    //console.log("url " + url);
  }
}
