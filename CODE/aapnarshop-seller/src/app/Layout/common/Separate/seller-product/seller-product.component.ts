import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Product } from 'src/app/Model/product';
import { ApihandlerServiceService } from 'src/app/service/apihandle/apihandler-service.service';

@Component({
  selector: 'app-seller-product',
  templateUrl: './seller-product.component.html',
  styleUrls: ['./seller-product.component.css']
})
export class SellerProductComponent implements OnInit {


  allproduct_list: Product[];
  constructor(private apiHandlerService: ApihandlerServiceService,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.all_product_list();
  }

  onLinkClick(event: MatTabChangeEvent) {
    //console.log(event.index);
    if (event.index == 0) {
      //this.route.navigate(['/dashboard']);
    } else if (event.index == 1) {
      //this.route.navigate(['/orders']);
    }
  }
  async all_product_list(): Promise<void> {
    const uri = await this.apiHandlerService.loadEndPoint('productlist');
    console.log(uri)
    this.http.post(uri, JSON.stringify({
      filterBy: "new"
    })
    ).subscribe(res => {
      console.log(res)
      let resSTR = JSON.stringify(res);
      let resJSON = JSON.parse(resSTR);
      if (resJSON.code === 200) {
        if (resJSON.data?.length > 0) {
          this.allproduct_list = resJSON.data;
        }
        console.log(this.allproduct_list.length)
      } else {
        return false;
      }
    });
  }

}
