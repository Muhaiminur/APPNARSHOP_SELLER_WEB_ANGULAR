import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import { JSONSchema, StorageMap } from '@ngx-pwa/local-storage';
import { Observable, of, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from 'src/app/Model/user';
import { ConfigService } from 'src/app/service/config/config.service';
import { StorageService } from 'src/app/service/storage/storage.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  pageState: any;
  matTabIndex: number = 3;
  headvalue: boolean = false;
  user: User;
  user_sub: Observable<User>;
  user_sub1: Subscription;
  schema: JSONSchema = {
    type: 'object',
    properties: {
      area: { type: 'string' },
      createdAt: { type: 'string' },
      sellerId: { type: 'string' },
      address: { type: 'string' },
      city: { type: 'string' },
      imageUrl: { type: 'string' },
      sellerName: { type: 'string' },
      shopName: { type: 'string' },
      shopType: { type: 'string' },
      email: { type: 'string' },
      contactNo: { type: 'string' },
    },
    required: ['area', 'createdAt', 'sellerId', 'address', 'city', 'imageUrl', 'sellerName', 'shopName', 'shopType', 'email', 'contactNo'],
  };
  constructor(private _Activatedroute: ActivatedRoute, public stor: StorageService, private url_con: ConfigService, private storageMap: StorageMap) { }


  ngOnInit() {
    this._Activatedroute.data.subscribe(data => {
      this.pageState = data;
    });
    if (this.pageState.page) {
      this.matTabIndex = this.pageState.page;
    }
    console.log("url home + " + this.url_con.getServerUrl())
    this.user_sub = this.storageMap.watch<User>('user', this.schema);
    this.user_sub.pipe(catchError(() => of('user')),).subscribe((result) => {
      //this.user=result.valueOf("");
      console.log("seller id" + result)
      /* if (result.sellerId != null) {
        this.headvalue = true;
      } else {
        this.headvalue = false;
      } */
    });
    this.user_sub1 = this.storageMap.watch('userid', { type: 'string' })
      .subscribe((result) => {
        console.log("seller id" + result)
        if (result != null) {
          this.headvalue = true;
        } else {
          this.headvalue = false;
        }
      });
  }

  newMatIndex = (tabChangeEvent: MatTabChangeEvent): void => {
    this.matTabIndex = tabChangeEvent.index;
  }

  add_to_cart() {
    console.log("working 1")
    this.stor.setcounter("cart", "9");

  }

  ngOnDestroy() {
    this.user_sub1.unsubscribe();
  }

}
