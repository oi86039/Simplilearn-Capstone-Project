
export class Review {
  private title: string;
  private description: string;
  private rating: number;

  public getTitle(): string {
    return this.title;
  }
  public getDescription(): string {
    return this.description;
  }
  public getRating(): number {
    return this.rating;
  }

  construct(data) {
    this.title = data["title"];
    this.description = data["description"];
    this.rating = data["rating"];
  }

  constructor(data) {
    this.title = data.title;
    this.description = data.description;
    this.rating = data.rating;
  }

  // constructor(title: string, description: string, rating: number) {
  //   this.title = title;
  //   this.description = description;
  //   this.rating = rating;
  // }
}
export class Item {
  private _id: string;
  private itemName: string;
  private imageURLs: string[];
  private Price: number;
  private description: string
  private inStock: number;
  private daysToArrive: number
  private tags: string[];
  private rating: number;
  private reviews: Review[];

  public get_id(): string { return this._id; }
  public set_id(_id: string): void { this._id = _id; }
  public getItemName(): string { return this.itemName; }
  public getImageURL(): string { return this.imageURLs[0]; }
  public getImageURLs(): string[] { return this.imageURLs; }
  public getPrice(): number { return this.Price; }
  public getDescription(): string { return this.description; }
  public getInStock(): number { return this.inStock; }
  public getDaysToArrive(): number { return this.daysToArrive; }
  public getTags(): string[] { return this.tags; }
  public getRating(): number { return this.rating; }
  public getReviews(): Review[] { return this.reviews; }
  public getReviewCount(): number { return this.reviews.length; }


  constructor(data) {
    this._id = data["_id"];
    this.itemName = data["itemName"];
    this.imageURLs = data["imageURLs"];
    this.Price = data["Price"];
    this.description = data["description"];
    this.inStock = data["inStock"];
    this.daysToArrive = data["daysToArrive"];
    this.tags = data["tags"];
    this.rating = data["rating"];
    this.reviews = [];
    //Reviews Population
    for (let i = 0; i<data["reviews"].length;i++){
    this.reviews.push(new Review(data["reviews"][i]));
  }
  }

  // constructor(itemName: string, imageURLs: string[], Price: number, description: string, inStock: number, daysToArrive: number, tags: string[], rating: number) {
  //   this.itemName = itemName;
  //   this.imageURLs = imageURLs;
  //   this.Price = Price;
  //   this.description = description;
  //   this.inStock = inStock;
  //   this.daysToArrive = daysToArrive;
  //   this.tags = tags;
  //   this.rating = rating;
  // }

}
export class CartItem {
  private _id: string;
  private itemName: string;
  private imageURL: string;
  private Price: number;
  private inStock: number;
  private daysToArrive: number
  private tags: string[];
  private rating: number;
  private quantity: number;

  public get_id(): string { return this._id; }
  public set_id(_id: string): void { this._id = _id; }
  public getItemName(): string { return this.itemName; }
  public getImageURL(): string { return this.imageURL; }
  public getPrice(): number { return this.Price; }
  public getInStock(): number { return this.inStock; }
  public getDaysToArrive(): number { return this.daysToArrive; }
  public getTags(): string[] { return this.tags; }
  public getRating(): number { return this.rating; }
  public getQuantity(): number { return this.quantity; }

  construct(data) {
    this._id = data["_id"];
    this.itemName = data["itemName"];
    this.imageURL = data["imageURL"];
    this.Price = data["Price"];
    this.inStock = data["inStock"];
    this.daysToArrive = data["daysToArrive"];
    this.tags = data["tags"];
    this.rating = data["rating"];
    this.quantity = data["quantity"];
  }

  constructor(_id: string, itemName: string, imageURL: string, Price: number, inStock: number, daysToArrive: number, tags: string[], rating: number, quantity: number) {
    this._id = _id;
    this.itemName = itemName;
    this.imageURL = imageURL;
    this.Price = Price;
    this.inStock = inStock;
    this.daysToArrive = daysToArrive;
    this.tags = tags;
    this.rating = rating;
    this.quantity = quantity;
  }
}

export class Cart {
  cartItems: CartItem[];
}

export class Catalogue {
  items: Item[];

  construct(data) {
    this.items = data;
  }
  constructor() {
    this.items = new Item[2];
  }
}

export class User {
  userType: String;
  userName: String;
  password: String;
  email: String;
  phone: Number;
  shippingAddress: String;
  shippingCity: String;
  shippingState: String;
  shippingZip: Number;
  shippingCountry: String;
  billingAddress: String;
  billingCity: String;
  billingState: String;
  billingZip: Number;
  billingCountry: String;
  balance: Number;
  cart: CartItem[];
  Purchase_History: CartItem[];
  Viewing_History: CartItem[];
}
export class Admin { 
  userType: String;
  userName: String;
  password: String;
}
export class testConnection {
  private _id: string;
  private content: any;
  public get_id(): string {
    return this._id;
  }
  public getContent(): any {
    return this.content;
  }
  construct(data) {
    this._id = data["_id"];
    this.content = data["content"];
  }
  constructor(_id: string = "", content: any = "") {
    this._id = _id;
    this.content = content;
  }
}
export class confirmation {
  private token: boolean;
  private msg: string;

  getToken(){
    return this.token;
  }
  getMsg(){
    return this.msg;
  }

  construct(data) {
    this.token = data["token"];
    this.msg = data["msg"];
  }

  constructor() {
    this.token = false;
    this.msg = "";
  }
}