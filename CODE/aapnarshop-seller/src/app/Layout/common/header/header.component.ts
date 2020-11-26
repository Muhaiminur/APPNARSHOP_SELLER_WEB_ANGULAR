import { Component, HostListener, OnInit } from '@angular/core';
import { JSONSchema, StorageMap } from '@ngx-pwa/local-storage';
import { Observable, of } from 'rxjs';
import { MenuItemInterface } from './menu-item-interface';

import { Subscription } from 'rxjs';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { User } from 'src/app/Model/user';
import { catchError } from 'rxjs/operators';
import { StorageService } from 'src/app/service/storage/storage.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isSticky: boolean = false;

  cart_count: string = "0";
  cart_sub: Subscription;
  user_name: string;
  user_obj: User;
  user_sub: Observable<User>;
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
  constructor(private storageMap: StorageMap, private route: Router, private stor: StorageService) { }

  ngOnInit(): void {
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
    this.storageMap.get('user').subscribe((user) => {
      //console.log(user);
      this.user_obj == user;
      console.log(this.user_obj);
    });
    if (this.stor.getClientData('sellerName') !== "") {
      this.user_name = this.stor.getClientData('sellerName');
    } else {
      this.user_name = "USER NAME";
    }
  }

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    this.isSticky = window.pageYOffset >= 64;
  }


  onLinkClick(event: MatTabChangeEvent) {
    //console.log(event.index);
    if (event.index == 0) {
      this.route.navigate(['/dashboard']);
    } else if (event.index == 1) {
      this.route.navigate(['/orders']);
    } else if (event.index == 2) {
      this.route.navigate(['/products']);
    } else if (event.index == 3) {
      this.route.navigate(['/offers']);
    } else if (event.index == 4) {
      this.route.navigate(['/reports']);
    } else if (event.index == 5) {
      this.route.navigate(['/profile']);
    } else if (event.index == 6) {
      this.route.navigate(['/rattings']);
    } else if (event.index == 7) {
      this.route.navigate(['/notifications']);
    } else if (event.index == 8) {
      this.route.navigate(['/settings']);
    }
  }

  /* public change_data(d: string) {
    for (let i = 0; i < this.menuItems.length; i++) {
      if (this.menuItems[i].icon == "shopping_cart") {
        this.menuItems[i].badge = d;
      }
    }
  } */

  ngOnDestroy() {
    this.cart_sub.unsubscribe();
  }
}