import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TestServiceService } from '../test-service.service';
import { CartItem } from '../test_structure';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart: CartItem[];
  total:number;

  constructor(private testService: TestServiceService, private router: Router) {
    this.viewCart();
  }

  ngOnInit(): void {
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
      this.total=0;
      for (let i = 0; i < data.content.length; i++) {
        this.cart.push(new CartItem(data.content[i]));
        this.total+=data.content[i].Price;
      }
    });
  }

  emptyCart() {
    if (!sessionStorage.getItem('userName')) {
      console.log("Error: Not signed in!")
      return null;
    }
    return this.testService.emptyCart(sessionStorage.getItem('userName')).subscribe(data => {
      this.router.navigate(["/products"])
    });
  }

  getTotalPrice(){
    return Math.round((this.total + Number.EPSILON) * 100) / 100;
  }

  getCartCount(){
    return this.cart.length;
  }

}
