import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

import { TestComponent } from './test/test.component';
import { TestServiceService } from './test-service.service';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CartComponent } from './cart/cart.component';
import { ProductsComponent } from './products/products.component';
import { AdminComponent } from './admin/admin.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { RootComponent } from './root/root.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileComponent } from './profile/profile.component';
import { ItemComponent } from './item/item.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CountriesComponent } from './countries/countries.component';
import { CartItemComponent } from './cart-item/cart-item.component';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    TestComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    CartComponent,
    ProductsComponent,
    AdminComponent,
    ProductDetailsComponent,
    RootComponent,
    NavbarComponent,
    ProfileComponent,
    ItemComponent,
    CheckoutComponent,
    CountriesComponent,
    CartItemComponent,
    AdminNavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
   // HttpClientModule
  ],
  providers: [TestServiceService, HttpClientModule],
  bootstrap: [RootComponent],
  exports: [AppRoutingModule,TestComponent,HomeComponent]
})
export class AppModule { }
