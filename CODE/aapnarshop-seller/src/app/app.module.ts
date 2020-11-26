import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BodyComponent } from './Layout/Common/body/body.component';
import { FooterComponent } from './Layout/Common/footer/footer.component';
import { HeaderComponent } from './Layout/Common/header/header.component';
import { AppmaterialModule } from './module/appmaterial/appmaterial.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoaderComponentComponent } from './Layout/common/loader-component/loader-component.component';
import { PageNotFoundComponent } from './Layout/common/page-not-found/page-not-found.component';
import { RouitngPathComponents, RoutingModule } from './module/routing/routing.module';
import { SignInComponent } from './Layout/sign-in/sign-in.component';
import { LandingpageComponent } from './Layout/common/Separate/landingpage/landingpage.component';
import { DashboardComponent } from './Layout/common/Separate/dashboard/dashboard.component';
import { ConfigService } from './service/config/config.service';
import { HttpInterceptorProviders } from './interceptor';
import { DialogCommonComponent } from './Layout/common/Dialog/dialog-common/dialog-common.component';
import { SellerOrderComponent } from './Layout/common/Separate/seller-order/seller-order.component';
import { ProductOfferComponent } from './Layout/common/Separate/product-offer/product-offer.component';
import { SellerReportComponent } from './Layout/common/Separate/seller-report/seller-report.component';
import { SellerProfileComponent } from './Layout/common/Separate/seller-profile/seller-profile.component';
import { SellerRattingComponent } from './Layout/common/Separate/seller-ratting/seller-ratting.component';
import { SellerNotificationComponent } from './Layout/common/Separate/seller-notification/seller-notification.component';
import { SellerSettingsComponent } from './Layout/common/Separate/seller-settings/seller-settings.component';
import { SellerProductComponent } from './Layout/common/Separate/seller-product/seller-product.component';
import { SellerProductListComponent } from './Layout/common/seller-product-list/seller-product-list.component';


const initializerConfigFn = (appConfig: ConfigService) => {
  return () => appConfig.loadAppConfig();
};

@NgModule({
  declarations: [
    AppComponent,
    RouitngPathComponents,
    SignInComponent,
    LandingpageComponent,
    DashboardComponent,
    DialogCommonComponent,
    SellerOrderComponent,
    ProductOfferComponent,
    SellerReportComponent,
    SellerProfileComponent,
    SellerRattingComponent,
    SellerNotificationComponent,
    SellerSettingsComponent,
    SellerProductComponent,
    SellerProductListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule, ReactiveFormsModule,
    AppmaterialModule,
    RoutingModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializerConfigFn,
      multi: true,
      deps: [ConfigService]
    },
    HttpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
