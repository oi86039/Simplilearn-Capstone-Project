import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  numOfProducts: number;
  numOfRows: number;
  numRemainder:number;
  arrayOfNum: number[];
  arrayOfRemainder: number[];

  constructor() {
    this.numOfProducts = 7;
    this.numOfRows = Math.floor(this.numOfProducts / 3);
    this.numRemainder =Math.round(this.numOfProducts%3); 
    this.arrayOfNum=new Array(this.numOfRows);
    this.arrayOfRemainder=new Array(this.numRemainder);
  }

  ngOnInit(): void {
  }

  getNumOfRows() {
    return this.arrayOfNum;
  }

  getRemainder() {
    return this.arrayOfRemainder;
  }
  ifRemainder(){
    return this.numRemainder>0;
  }
  loop(i:number){
    return new Array(i);
  }
}
