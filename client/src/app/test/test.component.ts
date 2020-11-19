import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
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

  //Product Form Control
  __id = "" //Update product
  itemName = "";
  imageURLs = "";
  Price = "";
  description = "";
  inStock = "";
  daysToArrive = "";
  tags = "";
  rating = "";
  reviews = "";

  _id = ""
  _name = ""
  _tag = ""

  _userName=""
  _password=""
  _email=""
  _phone=""

  constructor(public testService: TestServiceService,private router:Router) {
    this.TestConnection = new testConnection();
    this.Confirmation = new confirmation();
    this.items = [];
    this.users = [];
    this.cart = [];
  }

  counter(num) { //For ngFor loops
    return new Array(num);
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

  //#region Item management
  public getItemsArray() { if (this.items == []) console.log("No results found."); else return this.items; }
  // public Item_get_id(index): string { return this.items[index].get_id(); }
  //   public Item_getItemName(index): string { return this.items[index].getItemName(); }
  //   public Item_getImageURL(index): string[] { return this.items[index].getImageURLs(); }
  //   public Item_getPrice(index): number { return this.items[index].getPrice(); }
  //   public Item_getDescription(index): string { return this.items[index].getDescription(); }
  //   public Item_getInStock(index): number { return this.items[index].getInStock(); }
  //   public Item_getDaysToArrive(index): number { return this.items[index].getDaysToArrive(); }
  //   public Item_getTags(index): string[] { return this.items[index].getTags(); }
  //   public Item_getRating(index): number { return this.items[index].getRating(); }
  //   public Item_getReviews(index): Review[] { return this.items[index].getReviews(); }
  //#endregion

  public getCartArray() { if (this.cart == []) console.log("No results found."); else return this.cart; }

  //Catalogue
  admin_createProduct() {
    var json = {
      "itemName": this.itemName,
      "imageURLs": [this.imageURLs],
      "Price": this.Price,
      "description": this.description,
      "inStock": this.inStock,
      "daysToArrive": this.daysToArrive,
      "tags": [this.tags],
      "rating": this.rating,
      "reviews": []
    };
    //console.log(JSON.stringify(json));
    return this.testService.admin_createProduct(json).subscribe(data => this.Confirmation.construct(data));
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
    return this.testService.findProductsByName(this._name).subscribe(data => {
      this.items = [];
      if (data.token) {
        for (let a of data.content)
          this.items.push(new Item(a));
      }
    });
  }
  findProductsById() {
    return this.testService.findProductsById(this._id).subscribe(data => {
      this.items = [];
      if (data.token) {
        for (let a of data.content)
          this.items.push(new Item(a));
      }
    });
  }
  findProductsByTags() {
    return this.testService.findProductsByTag(this._tag).subscribe(data => {
      this.items = [];
      if (data.token) {
        for (let a of data.content)
          this.items.push(new Item(a));
      }
    });
  }
  admin_updateProduct() {  //No confirmation, but it does work.
    var json = {
      "itemName": this.itemName,
      "imageURLs": [this.imageURLs],
      "Price": this.Price,
      "description": this.description,
      "inStock": this.inStock,
      "daysToArrive": this.daysToArrive,
      "tags": [this.tags],
      "rating": this.rating,
      "reviews": []
    };
    return this.testService.admin_UpdateProduct(this.__id,json).subscribe(data => this.Confirmation.construct(data));

  }
  admin_deleteProduct() { //No confirmation, but it does work.
    return this.testService.admin_DeleteProduct(this.__id).subscribe(data => this.Confirmation.construct(data));
  }

  //User
  login() {
    return this.testService.login(this._userName, this._password).subscribe(data => {
      if (data.token=="false"){
        sessionStorage.clear();
      }
      else if (data.token=="user"){
        sessionStorage.setItem('userType',"user");
        sessionStorage.setItem('userName',data.content.userName);
        this.router.navigate(['/']); //Go to homepage, now signed in
      }
      else if (data.token=="admin"){
        sessionStorage.setItem('userType',"admin");
        sessionStorage.setItem('userName',data.content.userName);
        this.router.navigate(['/admin']);  //Go to admin page, now signed in
      }
    });
  }
  createUser() {
    let json = {
    "userName": this._userName,
    "password": this._password,
    "email": this._email,
    "phone": this._phone
    }; 
    return this.testService.createUser(json).subscribe(data => this.Confirmation.construct(data));
  }
  admin_createUser(user: User) {
    return this.testService.admin_createUser(user).subscribe(data => this.Confirmation.construct(data));
  }
  admin_viewAllUsers() {
    return this.testService.admin_viewAllUsers().subscribe(data => {
      this.users = null;
      for (let i = 0; i < data.length; i++) {
        this.users = data[i];
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
  viewCart() {
    if (!sessionStorage.getItem('userName')){
      console.log("Error: Not signed in!")
      return null;
    }
    return this.testService.viewCart(sessionStorage.getItem('userName')).subscribe(data => {
      this.cart = [];
      for (let i = 0; i < data.content.length; i++) {
        this.cart.push(new CartItem(data.content[i]));
      }
    });
  }

  addToCart() {
    if (!sessionStorage.getItem('userName')){
      console.log("Error: Not signed in!")
      return null;
    }
    return this.testService.addToCart(sessionStorage.getItem('userName'), this._id).subscribe(data => this.Confirmation.construct(data));
  }
  deleteFromCart(user_id, product_id) {
    return this.testService.deleteFromCart(user_id, product_id).subscribe(data => this.Confirmation.construct(data));
  }
  emptyCart(user_id) {
    return this.testService.emptyCart(user_id).subscribe(data => this.Confirmation.construct(data));
  }

}
