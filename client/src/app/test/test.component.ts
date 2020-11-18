import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TestServiceService } from '../test-service.service';
import { testConnection, Item, CartItem, Review, confirmation, User, Admin } from '../test_structure'

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  private TestConnection: testConnection;
  private Confirmation: confirmation;
  private users: User[];
  private items: Item[];
  private cart: CartItem[];

  //Create Account Form Control
  itemName="";
  imageURLs="";
  Price="";
  description="";
  inStock="";
  daysToArrive="";
  tags="";
  rating="";
  reviews="";

  constructor(public testService: TestServiceService) {
    this.TestConnection = new testConnection();
    this.Confirmation = new confirmation();
  }

  ngOnInit(): void {
  }

  testConnection() {
    return this.testService.testConnection().subscribe(data => this.TestConnection.construct(data));
  }
  getTestConnection() {
    return this.TestConnection.get_id() + " : " + this.TestConnection.getContent();
  }

  getConfirmation() {
    return this.Confirmation.getToken() + " : " + this.Confirmation.getMsg();
  }
  //Catalogue
  admin_createProduct() {
    var json={
      "itemName":this.itemName,
      "imageURLs":[this.imageURLs],
      "Price":this.Price,
      "description":this.description,
      "inStock":this.inStock,
      "daysToArrive":this.daysToArrive,
      "tags":[this.tags],
      "rating":this.rating,
      "reviews":[]
    };
    console.log(JSON.stringify(json));
    return this.testService.admin_createProduct(json).subscribe(data => this.Confirmation.construct(data));
  }
  viewAllProducts() {
    return this.testService.viewAllProducts().subscribe(data => {
      this.items = null;
      for (let i = 0; i < data.length; i++) {
        this.items[i] = data[i];
      }
    });
  }
  findProductsByName(name) {
    return this.testService.findProductsByName(name).subscribe(data => {
      this.items = null;
      for (let i = 0; i < data.length; i++) {
        this.items[i] = data[i];
      }
    });
  }
  findProductsById(_id) {
    return this.testService.findProductsById(_id).subscribe(data => {
      this.items = null;
      for (let i = 0; i < data.length; i++) {
        this.items[i] = data[i];
      }
    });
  }
  findProductsByTag(tags: string[]) {
    return this.testService.findProductsByTag(tags).subscribe(data => {
      this.items = null;
      for (let i = 0; i < data.length; i++) {
        this.items[i] = data[i];
      }
    });
  }
  admin_UpdateProduct(_id, item: Item) {
    return this.testService.admin_UpdateProduct(_id, item).subscribe(data => this.Confirmation.construct(data));

  }
  admin_DeleteProduct(_id) {
    return this.testService.admin_DeleteProduct(_id).subscribe(data => this.Confirmation.construct(data));
  }

  //User
  login(userName, password) {
    return this.testService.login(userName, password).subscribe(data => this.Confirmation.construct(data));
  }
  createUser(user: User) {
    return this.testService.createUser(user).subscribe(data => this.Confirmation.construct(data));
  }
  admin_createUser(user: User) {
    return this.testService.admin_createUser(user).subscribe(data => this.Confirmation.construct(data));
  }
  admin_viewAllUsers() {
    return this.testService.admin_viewAllUsers().subscribe(data => {
      this.users = null;
      for (let i = 0; i < data.length; i++) {
        this.users[i] = data[i];
      }
    });
  }
  admin_findUserByName(name) {
    return this.testService.admin_findUserByName(name).subscribe(data => {
      this.users = null;
      this.users[0] = data;
    });
  }
  admin_findUserById(_id) {
    return this.testService.admin_findUserById(_id).subscribe(data => {
      this.users = null;
      this.users[0] = data;
    });
  }
  admin_updateUser(_id, user: User) {
    return this.testService.admin_updateUser(_id, user).subscribe(data => this.Confirmation.construct(data));
  }
  addShippingDetails(_id, details) {
    return this.testService.addShippingDetails(_id, details).subscribe(data => this.Confirmation.construct(data));
  }
  addBillingDetails(_id, details) {
    return this.testService.addBillingDetails(_id, details).subscribe(data => this.Confirmation.construct(data));
  }
  admin_deleteUser(_id) {
    return this.testService.admin_deleteUser(_id).subscribe(data => this.Confirmation.construct(data));
  }

  //Cart
  viewCart(_id) {
    return this.testService.viewCart(_id).subscribe(data => {
      this.cart = null;
      for (let i = 0; i < data.length; i++) {
        this.cart[i] = data[i];
      }
    });
  }

  addToCart(user_id, product_id) {
    return this.testService.addToCart(user_id, product_id).subscribe(data => this.Confirmation.construct(data));
  }
  deleteFromCart(user_id, product_id) {
    return this.testService.deleteFromCart(user_id, product_id).subscribe(data => this.Confirmation.construct(data));
  }
  emptyCart(user_id) {
    return this.testService.emptyCart(user_id).subscribe(data => this.Confirmation.construct(data));
  }

}
