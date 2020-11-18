import { Component, OnInit } from '@angular/core';
import { TestServiceService } from '../test-service.service';
import { testConnection, confirmation, User, Item, CartItem } from '../test_structure';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  private items: Item[];

  _name = ""
  _tag = ""

  constructor(public testService: TestServiceService) {
    this.viewAllProducts();
  }

  ngOnInit(): void {
  }
  public getItemsArray() { if (this.items == []) console.log("No results found."); else return this.items; }
  public getItem(index:number) { if (this.items == []) console.log("No results found."); else return this.items[index]; }

  getProductCount(){
    return this.items.length;
  }

  viewAllProducts() {
    return this.testService.viewAllProducts().subscribe(data => {
      //console.log(data);
      this.items = [];
      for (let i = 0; i < data.content.length; i++) {
        this.items.push(new Item(data.content[i]));
      }
    });
  }
  findProductsByName() {
    if (this._name=="") return this.viewAllProducts();
    return this.testService.findProductsByName(this._name).subscribe(data => {
      this.items = [];
      if (data.token) {
        for (let a of data.content)
          this.items.push(new Item(a));
      }
    });
  }
  // findProductsById() {
  //   return this.testService.findProductsById(this._id).subscribe(data => {
  //     this.items = [];
  //     if (data.token) {
  //       for (let a of data.content)
  //         this.items.push(new Item(a));
  //     }
  //   });
  // }
  findProductsByTags() {
    return this.testService.findProductsByTag(this._tag).subscribe(data => {
      this.items = [];
      if (data.token) {
        for (let a of data.content)
          this.items.push(new Item(a));
      }
    });
  }
  findProductsByTagSpecified(tag:string) {
    return this.testService.findProductsByTag(tag).subscribe(data => {
      this.items = [];
      if (data.token) {
        for (let a of data.content)
          this.items.push(new Item(a));
      }
    });
  }

  loop(i:number){
    return new Array(i);
  }
}
