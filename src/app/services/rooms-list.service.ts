import { Injectable } from '@angular/core';
import { getRoomsList } from '../modules/requests/request';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoomsListService {

  constructor(private httpClient: HttpClient) { }

  getRoomsList(): Observable<any> {
    return this.httpClient.get("http://localhost:8080/")
  }
  

}
