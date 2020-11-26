import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApihandlerServiceService } from 'src/app/service/apihandle/apihandler-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dash: DASHBOARED;

  constructor(private route: Router, private apiHandlerService: ApihandlerServiceService, private http: HttpClient) { }

  ngOnInit(): void {
    this.dash_boared();
  }

  async dash_boared(): Promise<void> {
    const uri = await this.apiHandlerService.loadEndPoint('dashboared');
    this.http.post(uri, null
    ).subscribe(res => {
      console.log(res)
      let resSTR = JSON.stringify(res);
      let resJSON = JSON.parse(resSTR);
      if (resJSON.code === 200) {
        this.dash = resJSON.data;
      } else {
        return false;
      }
    });
  }

}
export interface DASHBOARED {
  limitedProduct: string;
  activeProduct: string;
  newOrder: string;
}
