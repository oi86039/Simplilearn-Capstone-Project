import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { testConnection, Item, CartItem, Review, confirmation,User,Admin } from './test_structure'

//Get - Retrieve resource from server
//Post - Send data and make resource on server
//Put - Update resource on server
//Delete - Delete resource on server

@Injectable({
  providedIn: 'root'
})
export class TestServiceService {

  constructor(public httpClient:HttpClient) { }   // DI for HttpClient

  //Catalogue
  testConnection(): Observable<testConnection>{
    return this.httpClient.get<testConnection>("http://localhost:3000/test/");
  }
  admin_createProduct(json):Observable<any>{
    return this.httpClient.post<any>("http://localhost:3000/test/admin/createProduct/",json);
  }
  viewAllProducts():Observable<any>{
    return this.httpClient.get<any>("http://localhost:3000/test/viewAllProducts/");
  }
  findProductsByName(name):Observable<any>{
    return this.httpClient.get<any>("http://localhost:3000/test/findProductsByName/"+name);
  }
  findProductsById(_id):Observable<any>{
    return this.httpClient.get<any>("http://localhost:3000/test/findProductsById/"+_id);
  }
  findProductsByTag(tag:string):Observable<any>{
    return this.httpClient.get<any>("http://localhost:3000/test/findProductsByTag/"+tag);
  }
  admin_UpdateProduct(_id,json):Observable<any>{
    return this.httpClient.put<any>("http://localhost:3000/test/admin/updateProduct/"+_id,json);
  }
  admin_DeleteProduct(_id):Observable<any>{
    return this.httpClient.delete<any>("http://localhost:3000/test/admin/deleteProduct/"+_id);
  }

  //User
  login(userName,password):Observable<any>{
    return this.httpClient.post<any>("http://localhost:3000/test/login/"+userName,{"password":password});
  }
  createUser(user:User):Observable<any>{
    return this.httpClient.put<any>("http://localhost:3000/test/createUser/",user);
  }
  admin_createUser(user:User):Observable<any>{
    return this.httpClient.put<any>("http://localhost:3000/test/admin/createUser/",user);
  }
  admin_viewAllUsers():Observable<any>{
    return this.httpClient.get<any>("http://localhost:3000/test/admin/viewAllUsers/");
  }
  admin_findUserByName(name):Observable<any>{
    return this.httpClient.get<any>("http://localhost:3000/test/admin/findUserByName/"+name);
  }
  admin_findUserById(_id):Observable<any>{
    return this.httpClient.get<User>("http://localhost:3000/test/admin/findUserById/"+_id);
  }
  admin_updateUser(_id,user:User):Observable<any>{
    return this.httpClient.put<any>("http://localhost:3000/test/admin/updateUser/"+_id,user);
  }
  addShippingDetails(_id,details):Observable<any>{
    return this.httpClient.post<any>("http://localhost:3000/test/admin/addShippingDetails/"+_id,details)
  }
  addBillingDetails(_id,details):Observable<confirmation>{
    return this.httpClient.post<confirmation>("http://localhost:3000/test/admin/addBillingDetails/"+_id,details)
  }
  admin_deleteUser(_id):Observable<any>{
    return this.httpClient.delete<any>("http://localhost:3000/test/admin/deleteUser/"+_id);
  }

  //Cart
  viewCart(_id):Observable<any>{
    return this.httpClient.get<any>("http://localhost:3000/test/viewCart/"+_id);
  }

  addToCart(user_id,product_id):Observable<any>{
    return this.httpClient.put<any>("http://localhost:3000/test/addToCart/"+user_id,product_id);
  }
  deleteFromCart(user_id,_productId):Observable<any>{
    return this.httpClient.put<any>("http://localhost:3000/test/deleteFromCart/"+user_id,_productId);
  }
  emptyCart(user_id):Observable<any>{
    return this.httpClient.delete<any>("http://localhost:3000/test/emptyCart/"+user_id);
  }
}
