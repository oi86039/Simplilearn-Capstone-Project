import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { testConnection} from './test_structure'

@Injectable({
  providedIn: 'root'
})
export class TestServiceService {

  constructor(public httpClient:HttpClient) { }   // DI for HttpClient

  testConnection(): Observable<testConnection>{
    return this.httpClient.get<testConnection>("http://localhost:3000/test/");
  }

}
