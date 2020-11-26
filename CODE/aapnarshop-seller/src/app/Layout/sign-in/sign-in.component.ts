import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JSONSchema, StorageMap } from '@ngx-pwa/local-storage';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/operators';
import { User } from 'src/app/Model/user';
import { ApihandlerServiceService } from 'src/app/service/apihandle/apihandler-service.service';
import { DialogService } from 'src/app/service/Dialog/dialog.service';
import { StorageService } from 'src/app/service/storage/storage.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SignInComponent implements OnInit {
  common_message = new FormControl('', [Validators.required]);
  name_form = new FormControl('', [Validators.required]);
  mbl_form = new FormControl('', [Validators.required]);
  email_form = new FormControl('', [Validators.required, Validators.email]);
  shop_type_form = new FormControl('', [Validators.required]);
  shop_name_form = new FormControl('', [Validators.required]);
  div_form = new FormControl('', [Validators.required]);
  dis_form = new FormControl('', [Validators.required]);
  city_form = new FormControl('', [Validators.required]);
  area_form = new FormControl('', [Validators.required]);
  address_form = new FormControl('', [Validators.required]);
  login_user_form = new FormControl('', [Validators.required]);
  login_pass_form = new FormControl('', [Validators.required]);
  hide = true;
  public shopcat_list: SHOPCAT[];
  public div_list: DIVLIST[];
  public dis_list: DISLIST[];
  public city_list: CITYLIST[];
  public area_list: AREALIST[];
  sellerName: String;
  phone: String;
  email: String;
  shopType: String;
  shopName: String;
  areaId: String;
  address: String;
  userName: string;
  password: string;

  user: User;

  validation = {
    textTitle: 'Fill up All the Information',
    textBody: '',
    textCancel: '',
    textConfirm: 'Ok'
  };

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
  constructor(private route: Router, private apiHandlerService: ApihandlerServiceService,
    private http: HttpClient, private dialogService: DialogService, private storageMap: StorageMap, public stor: StorageService) { }

  ngOnInit(): void {
    this.reg_shop_type();
    this.reg_div_list();
    this.user_sub = this.storageMap.watch<User>('user', this.schema);
    /* this.user_sub.pipe(catchError(() => of('user')),).subscribe((result) => {
      console.log(result)
    }); */
  }
  signin_work() {
    if (this.userName != null && this.password) {
      this.user_login();
    } else {
      this.validation.textBody = ""
      this.validation.textTitle = "Fill up All the Information";
      console.log(this.userName)
      console.log(this.password)
      this.dialogService.open(this.validation);
    }
    //this.route.navigate(['/dashboard']);
  }
  signup_work() {
    if (this.sellerName != null && this.phone != null && this.email != null && this.shopType != null && this.shopName != null && this.areaId != null && this.address != null) {
      this.reg_create();
    } else {/* 
      this.validation.textBody = "";
      this.validation.textTitle = "সব তথ্য পূরণ করুন";
      this.dialogService.open(this.validation); */
      /* console.log(this.sellerName)
      console.log(this.phone)
      console.log(this.email)
      console.log(this.shopType)
      console.log(this.shopName)
      console.log(this.areaId)
      console.log(this.address) */
      this.validation.textBody = ""
      this.validation.textTitle = "Fill up All the Information";
      this.dialogService.open(this.validation);
    }
  }

  public divison_select(event: any) {
    //console.log(event.source.value.divisionId)
    this.reg_dis_type(event.source.value.divisionId);
  }
  public district_select(event: any) {
    //console.log(event.source.value.divisionId)
    this.reg_city_type(event.source.value.districtId);
  }
  public city_select(event: any) {
    //console.log(event.source.value.divisionId)
    this.reg_area_type(event.source.value.cityId);
  }
  public area_select(event: any) {
    //console.log(event.source.value.divisionId)
    //this.reg_area_type(event.source.value.divisionId);
  }

  async reg_shop_type(): Promise<void> {
    const uri = await this.apiHandlerService.loadEndPoint('shop_type');
    console.log(uri)
    this.http.post(uri, null
    ).subscribe(res => {
      console.log(res)
      let resSTR = JSON.stringify(res);
      let resJSON = JSON.parse(resSTR);
      if (resJSON.code === 200) {
        if (resJSON.data?.length > 0) {
          this.shopcat_list = resJSON.data;
        }
        console.log(this.shopcat_list.length)
      } else {
        return false;
      }
    });
  }

  async reg_div_list(): Promise<void> {
    const uri = await this.apiHandlerService.loadEndPoint('div_list');
    console.log(uri)
    this.http.post(uri, null
    ).subscribe(res => {
      console.log(res)
      let resSTR = JSON.stringify(res);
      let resJSON = JSON.parse(resSTR);
      if (resJSON.code === 200) {
        if (resJSON.data?.length > 0) {
          this.div_list = resJSON.data;
        }
        console.log(this.div_list.length)
      } else {
        return false;
      }
    });
  }
  async reg_dis_type(div_id: string): Promise<void> {
    const uri = await this.apiHandlerService.loadEndPoint('dis_list');
    console.log(uri)
    this.http.post(uri, JSON.stringify({
      divisionId: div_id.toString(),
    })
    ).subscribe(res => {
      console.log(res)
      let resSTR = JSON.stringify(res);
      let resJSON = JSON.parse(resSTR);
      if (resJSON.code === 200) {
        if (resJSON.data?.length > 0) {
          this.dis_list = resJSON.data;
        }
        console.log(this.dis_list.length)
      } else {
        return false;
      }
    });
  }
  async reg_city_type(dis_id: string): Promise<void> {
    const uri = await this.apiHandlerService.loadEndPoint('city_list');
    console.log(uri)
    this.http.post(uri, JSON.stringify({
      districtId: dis_id.toString(),
    })
    ).subscribe(res => {
      console.log(res)
      let resSTR = JSON.stringify(res);
      let resJSON = JSON.parse(resSTR);
      if (resJSON.code === 200) {
        if (resJSON.data?.length > 0) {
          this.city_list = resJSON.data;
        }
        console.log(this.city_list.length)
      } else {
        return false;
      }
    });
  }
  async reg_area_type(city_id: string): Promise<void> {
    const uri = await this.apiHandlerService.loadEndPoint('area_list');
    console.log(uri)
    this.http.post(uri, JSON.stringify({
      cityId: city_id.toString(),
    })
    ).subscribe(res => {
      console.log(res)
      let resSTR = JSON.stringify(res);
      let resJSON = JSON.parse(resSTR);
      if (resJSON.code === 200) {
        if (resJSON.data?.length > 0) {
          this.area_list = resJSON.data;
        }
        console.log(this.area_list.length)
      } else {
        return false;
      }
    });
  }

  async reg_create(): Promise<void> {
    const uri = await this.apiHandlerService.loadEndPoint('shop_reg');
    console.log(uri)
    this.http.post(uri, JSON.stringify({
      sellerName: this.sellerName.toString(),
      phone: this.phone.toString(),
      email: this.email.toString(),
      shopType: this.shopType.toString(),
      shopName: this.shopName.toString(),
      areaId: this.areaId.toString(),
      address: this.address.toString()
    })
    ).subscribe(res => {
      console.log(res)
      let resSTR = JSON.stringify(res);
      let resJSON = JSON.parse(resSTR);
      if (resJSON.code === 200) {
        this.validation.textBody = resJSON.data?.toString();
        this.validation.textTitle = "Registration Complete";
        this.dialogService.open(this.validation);
      } else if (resJSON.code === 333) {
        this.validation.textBody = resJSON.data?.toString();
        this.validation.textTitle = "Registration Not Complete";
        this.dialogService.open(this.validation);
      } else if (resJSON.code === 201) {
        this.validation.textBody = resJSON.data?.toString();
        this.validation.textTitle = resJSON.data?.toString();
        this.dialogService.open(this.validation);
      } else {
        this.validation.textBody = ""
        this.validation.textTitle = "Try Again Later";
        this.dialogService.open(this.validation);
        return false;
      }
    });
  }
  async user_login(): Promise<void> {
    const uri = await this.apiHandlerService.loadEndPoint('shop_login');
    console.log(uri)
    this.http.post(uri, JSON.stringify({
      userName: this.userName.toString(),
      password: this.password.toString()
    })
    ).subscribe(res => {
      console.log(res)
      let resSTR = JSON.stringify(res);
      let resJSON = JSON.parse(resSTR);
      if (resJSON.code === 200) {
        this.user = resJSON.data;
        console.log("paisi" + this.user.sellerName)
        this.stor.setuser('user', this.user);
        this.stor.setuserID('userid', this.user.sellerId);
        this.stor.setClientData(this.user);
        this.route.navigate(['/dashboard']);
      } else if (resJSON.code === 333) {
        this.validation.textBody = resJSON.data?.toString();
        this.validation.textTitle = "";
        this.dialogService.open(this.validation);
      } else if (resJSON.code === 201) {
        this.validation.textBody = "";
        this.validation.textTitle = resJSON.data?.toString();
        this.dialogService.open(this.validation);
      } else if (resJSON.code === 202) {
        this.validation.textBody = "";
        this.validation.textTitle = resJSON.data?.toString();
        this.dialogService.open(this.validation);
      } else if (resJSON.code === 203) {
        this.validation.textBody = "";
        this.validation.textTitle = resJSON.data?.toString();
        this.dialogService.open(this.validation);
      } else if (resJSON.code === 204) {
        this.validation.textBody = "";
        this.validation.textTitle = resJSON.data?.toString();
        this.dialogService.open(this.validation);
      } else {
        this.validation.textBody = ""
        this.validation.textTitle = "Try Again Later";
        this.dialogService.open(this.validation);
        return false;
      }
    });
  }
}
export interface Shop_category {
  code: number;
  data?: (any)[] | null;
  message: string;
}
export interface SHOPCAT {
  shopCategoryId: string;
  shopCategoryTitle: string;
}
export interface DIVLIST {
  division: string;
  divisionId: string;
}
export interface DISLIST {
  districtId: string;
  district: string;
}
export interface CITYLIST {
  city: string;
  cityId: string;
}
export interface AREALIST {
  area: string;
  areaId: string;
}
