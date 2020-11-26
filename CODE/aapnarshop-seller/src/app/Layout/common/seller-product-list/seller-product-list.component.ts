import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/Model/product';

@Component({
  selector: 'app-seller-product-list',
  templateUrl: './seller-product-list.component.html',
  styleUrls: ['./seller-product-list.component.css']
})
export class SellerProductListComponent implements OnInit {

  @Input('productdata')
  product: Product;
  noimage: boolean;

  constructor() { }

  ngOnInit(): void {
    if (!this.product.image.length) {
      console.log("false")
      this.noimage = false;
    } else {
      console.log("true")
      this.noimage = true;
    }
  }

}
