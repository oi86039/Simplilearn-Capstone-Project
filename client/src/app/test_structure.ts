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

  constructor(title: string, description: string, rating: number) {
    this.title = title;
    this.description = description;
    this.rating = rating;
  }
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
  public getImageURLs(): string[] { return this.imageURLs; }
  public getPrice(): number { return this.Price; }
  public getDescription(): string { return this.description; }
  public getInStock(): number { return this.inStock; }
  public getDaysToArrive(): number { return this.daysToArrive; }
  public getTags(): string[] { return this.tags; }
  public getRating(): number { return this.rating; }
  public getReviews(): Review[] { return this.reviews; }

  construct(data) {
    this._id = data["_id"];
    this.itemName = data["itemName"];
    this.imageURLs = data["imageURLs"];
    this.Price = data["Price"];
    this.description = data["description"];
    this.inStock = data["inStock"];
    this.daysToArrive = data["daysToArrive"];
    this.tags = data["tags"];
    this.rating = data["rating"];
    this.reviews = data["reviews"];
  }

  constructor(_id: string, itemName: string, imageURLs: string[], Price: number, description: string, inStock: number, daysToArrive: number, tags: string[], rating: number, reviews: Review[]) {
    this._id = _id;
    this.itemName = itemName;
    this.imageURLs = imageURLs;
    this.Price = Price;
    this.description = description;
    this.inStock = inStock;
    this.daysToArrive = daysToArrive;
    this.tags = tags;
    this.rating = rating;
    this.reviews = reviews;
  }

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
// export class Catalogue {
//   items:Item[];

//   construct(data){

//   }
//   constructor(){

//   }
// }

//export class User{}
//export class Admin{}
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