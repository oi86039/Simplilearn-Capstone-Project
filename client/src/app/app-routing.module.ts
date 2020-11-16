import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin/admin.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductsComponent } from './products/products.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [ 
    {path:'',component: HomeComponent},
    {path:'login',component: LoginComponent},
    {path:'signup',component: SignupComponent},
    {path:'admin',component: AdminComponent},
    {path:'products',component: ProductsComponent},
    {path:'products/:productId',component: ProductDetailsComponent},
    {path:'cart',component: CartComponent},
    {path:'profile',component: ProfileComponent},
    {path:'test',component: TestComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }