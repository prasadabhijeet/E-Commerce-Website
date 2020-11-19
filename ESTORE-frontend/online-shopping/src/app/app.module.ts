import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ValidatorsModule } from 'ngx-validators';
import { SignupComponent } from './Sign/signup/signup.component';
import { SigninComponent } from './Sign/signin/signin.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { ListProductComponent } from './list-product/list-product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthInterceptor } from './auth-interceptor.interceptor';
import { CheckoutComponent } from './checkout/checkout.component';
import { ApprovalsComponent } from './admin/approvals/approvals.component';
import { UsersComponent } from './admin/users/users.component';
import { ReviewsComponent } from './admin/reviews/reviews.component';
import { EnumToArrayPipe } from './pipes/enum-to-array.pipe';
import { SellerProductsComponent } from './seller-products/seller-products.component';
import { CreateProductComponent } from './product/create/create-product.component';
import {UpdateProductComponent} from './product/update/update-product.component';
import { SellerOrdersComponent } from './seller-orders/seller-orders.component';
import { OrderViewComponent } from './order-view/order-view.component';
import {BuyerOrdersComponent} from './buyer-orders/buyer-orders.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { AddReviewComponent } from './add-review/add-review.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    ValidatorsModule
  ],
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    HomeComponent,
    ListProductComponent,
    ProductDetailsComponent,
    CartComponent,
    CheckoutComponent,
    ApprovalsComponent,
    UsersComponent,
    ReviewsComponent,
    EnumToArrayPipe,
    SellerProductsComponent,
    CreateProductComponent,
    UpdateProductComponent,
    SellerOrdersComponent,
    BuyerOrdersComponent,
    OrderViewComponent,
    ConfirmationComponent,
    AddReviewComponent
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
    }],

  bootstrap: [AppComponent],
  exports: [SigninComponent, SignupComponent, HomeComponent]
})
export class AppModule { }
