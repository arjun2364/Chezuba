import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiValue } from './models/apiValue.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private readonly httpClient: HttpClient) { }

  /**Call http API to get data */
  getApiValues(){
    return this.httpClient.get<apiValue[]>("https://jsonplaceholder.typicode.com/posts");
  }
}
