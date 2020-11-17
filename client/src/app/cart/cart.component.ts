import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  numOfProducts: number;
  arrayOfNum: number[];

  constructor() {
    this.numOfProducts = 5;
    this.arrayOfNum=new Array(this.numOfProducts);  }

  ngOnInit(): void {
  }

  getNumOfRows() {
    return this.arrayOfNum;
  }

  loop(i:number){
    return new Array(i);
  }
}
