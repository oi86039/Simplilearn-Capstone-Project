import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { TestServiceService } from '../test-service.service';
import { Cart, CartItem } from '../test_structure';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  cart: CartItem[];
  total: number;

  constructor(private location: Location, private testService: TestServiceService) { this.viewCart(); }

  ngOnInit(): void {

  }
  back(): void {
    this.location.back();
  }

  loop(i: number) {
    return new Array(i);
  }

  public getCartArray() { if (this.cart == []) console.log("No results found."); else return this.cart; }

  //Cart
  viewCart() {
    if (!sessionStorage.getItem('userName')) {
      console.log("Error: Not signed in!")
      return null;
    }
    return this.testService.viewCart(sessionStorage.getItem('userName')).subscribe(data => {
      this.cart = [];
      this.total = 0;
      for (let i = 0; i < data.content.length; i++) {
        this.cart.push(new CartItem(data.content[i]));
        this.total += data.content[i].Price;
      }
    });
  }
  emptyCart() {
    if (!sessionStorage.getItem('userName')){
      console.log("Error: Not signed in!")
      return null;
    }
    return this.testService.emptyCart(sessionStorage.getItem('userName')).subscribe(data => {});
  }

  getTotalPrice() {
    return this.total;
  }

  getCartCount() {
    return this.cart.length;
  }
}
