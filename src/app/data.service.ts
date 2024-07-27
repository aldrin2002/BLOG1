import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public apiUrl = 'http://localhost/BlogAPI/api';

  constructor(private http: HttpClient) {}

  userRegister(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  userLogin(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, userData);
  }
  createPost(addpost: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/addpost`, addpost);
  }
  
}
