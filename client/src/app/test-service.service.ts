import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { testConnection, Item, CartItem, Review, confirmation,User,Admin } from './test_structure'

@Injectable({
  providedIn: 'root'
})
export class TestServiceService {

  constructor(public httpClient:HttpClient) { }   // DI for HttpClient

  //Catalogue
  testConnection(): Observable<testConnection>{
    return this.httpClient.get<testConnection>("http://localhost:3000/test/");
  }
  admin_createProduct(Item):Observable<Item>{
    return this.httpClient.put<Item>("http://localhost:3000/test/admin/createProduct/",Item);
  }
  viewAllProducts():Observable<Item[]>{
    return this.httpClient.get<Item[]>("http://localhost:3000/test/viewAllProducts/");
  }
  findProductsByName(name):Observable<Item[]>{
    return this.httpClient.get<Item[]>("http://localhost:3000/test/findProductsByName/"+name);
  }
  findProductsById(_id):Observable<Item[]>{
    return this.httpClient.get<Item[]>("http://localhost:3000/test/findProductsById/"+_id);
  }
  findProductsByTag(tags:string[]):Observable<Item[]>{
    return this.httpClient.post<Item[]>("http://localhost:3000/test/findProductsByTag/",tags);
  }
  admin_UpdateProduct(_id,item:Item):Observable<confirmation>{
    return this.httpClient.put<confirmation>("http://localhost:3000/test/admin/updateProduct/"+_id,item);
  }
  admin_DeleteProduct(_id):Observable<confirmation>{
    return this.httpClient.delete<confirmation>("http://localhost:3000/test/admin/updateProduct/"+_id);
  }

  //User
  login(userName,password):Observable<confirmation>{
    return this.httpClient.post<confirmation>("http://localhost:3000/test/login/",{"userName":userName,"password":password});
  }
  createUser(user:User):Observable<confirmation>{
    return this.httpClient.put<confirmation>("http://localhost:3000/test/createUser/",user);
  }
  admin_createUser(user:User):Observable<confirmation>{
    return this.httpClient.put<confirmation>("http://localhost:3000/test/admin/createUser/",user);
  }
  admin_viewAllUsers():Observable<User[]>{
    return this.httpClient.get<User[]>("http://localhost:3000/test/admin/viewAllUsers/");
  }
  admin_findUserByName(name):Observable<User>{
    return this.httpClient.get<User>("http://localhost:3000/test/admin/findUserByName/"+name);
  }
  admin_findUserById(_id):Observable<User>{
    return this.httpClient.get<User>("http://localhost:3000/test/admin/findUserById/"+_id);
  }
  admin_updateUser(_id,user:User):Observable<confirmation>{
    return this.httpClient.put<confirmation>("http://localhost:3000/test/admin/updateUser/"+_id,user);
  }
  addShippingDetails(_id,details):Observable<confirmation>{
    return this.httpClient.post<confirmation>("http://localhost:3000/test/admin/addShippingDetails/"+_id,details)
  }
  addBillingDetails(_id,details):Observable<confirmation>{
    return this.httpClient.post<confirmation>("http://localhost:3000/test/admin/addBillingDetails/"+_id,details)
  }
  admin_deleteUser(_id):Observable<confirmation>{
    return this.httpClient.delete<confirmation>("http://localhost:3000/test/admin/deleteUser/"+_id);
  }

  //Cart
  viewCart(_id):Observable<CartItem[]>{
    return this.httpClient.get<CartItem[]>("http://localhost:3000/test/viewCart/"+_id);
  }

  addToCart(user_id,product_id):Observable<confirmation>{
    return this.httpClient.put<confirmation>("http://localhost:3000/test/addToCart/"+user_id,product_id);
  }
  deleteFromCart(user_id,_productId):Observable<confirmation>{
    return this.httpClient.post<confirmation>("http://localhost:3000/test/deleteFromCart/"+user_id,_productId);
  }
  emptyCart(user_id):Observable<confirmation>{
    return this.httpClient.delete<confirmation>("http://localhost:3000/test/emptyCart/"+user_id);
  }
}
