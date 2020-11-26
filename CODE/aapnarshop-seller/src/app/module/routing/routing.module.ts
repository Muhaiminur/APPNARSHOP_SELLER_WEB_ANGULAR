import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from "@angular/router";
import { PageNotFoundComponent } from 'src/app/Layout/common/page-not-found/page-not-found.component';
import { HeaderComponent } from 'src/app/Layout/Common/header/header.component';
import { FooterComponent } from 'src/app/Layout/Common/footer/footer.component';
import { BodyComponent } from 'src/app/Layout/Common/body/body.component';
import { LoaderComponentComponent } from 'src/app/Layout/common/loader-component/loader-component.component';
import { AppComponent } from 'src/app/app.component';
import { SignInComponent } from 'src/app/Layout/sign-in/sign-in.component';
import { DashboardComponent } from 'src/app/Layout/common/Separate/dashboard/dashboard.component';
import { AuthguardGuard } from 'src/app/guards/authguard.guard';
import { SellerOrderComponent } from 'src/app/Layout/common/Separate/seller-order/seller-order.component';
import { ProductOfferComponent } from 'src/app/Layout/common/Separate/product-offer/product-offer.component';
import { SellerReportComponent } from 'src/app/Layout/common/Separate/seller-report/seller-report.component';
import { SellerProfileComponent } from 'src/app/Layout/common/Separate/seller-profile/seller-profile.component';
import { SellerRattingComponent } from 'src/app/Layout/common/Separate/seller-ratting/seller-ratting.component';
import { SellerNotificationComponent } from 'src/app/Layout/common/Separate/seller-notification/seller-notification.component';
import { SellerSettingsComponent } from 'src/app/Layout/common/Separate/seller-settings/seller-settings.component';
import { SellerProductComponent } from 'src/app/Layout/common/Separate/seller-product/seller-product.component';


const routes: Routes = [

  { path: 'home', component: SignInComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthguardGuard] },
  { path: 'orders', component: SellerOrderComponent, canActivate: [AuthguardGuard] },
  { path: 'products', component: SellerProductComponent, canActivate: [AuthguardGuard] },
  { path: 'offers', component: ProductOfferComponent, canActivate: [AuthguardGuard] },
  { path: 'reports', component: SellerReportComponent, canActivate: [AuthguardGuard] },
  { path: 'profile', component: SellerProfileComponent, canActivate: [AuthguardGuard] },
  { path: 'rattings', component: SellerRattingComponent, canActivate: [AuthguardGuard] },
  { path: 'notifications', component: SellerNotificationComponent, canActivate: [AuthguardGuard] },
  { path: 'settings', component: SellerSettingsComponent, canActivate: [AuthguardGuard] },

  // Fail-safe redirection
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes//,
      //{ enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class RoutingModule { }
export const RouitngPathComponents = [
  HeaderComponent,
  FooterComponent,
  BodyComponent,
  LoaderComponentComponent,
  PageNotFoundComponent
]
