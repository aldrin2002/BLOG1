import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {

  constructor(private http: HttpClient) { }

  apiUrl = "http://localhost/api-bloggy/";

  // Existing methods
  sendApiRequest(method: any, data: any) {
    return <any>(this.http.post(this.apiUrl + method, btoa(JSON.stringify(data))));
  }

  receiveApiRequest(method: any) {
    return this.http.get(this.apiUrl + method);
  }

  logout() {
    localStorage.removeItem("user_id");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
  }

  // Get all posts
  getPosts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/posts`);
  }

  // Upload an image
  uploadImage(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/uploadImage`, formData);
  }

  // Create a new post
  createPost(postData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/posts`, postData);
  }
}
