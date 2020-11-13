import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { TestComponent } from './test/test.component';
import { TestServiceService } from './test-service.service';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CartComponent } from './cart/cart.component';
import { ProductsComponent } from './products/products.component';
//import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    TestComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    CartComponent,
    ProductsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
   // HttpClientModule
  ],
  providers: [TestServiceService, HttpClientModule],
  bootstrap: [TestComponent]
})
export class AppModule { }
