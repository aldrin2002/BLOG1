import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'http://localhost/BlogAPI/api';

  constructor(private http: HttpClient) {}

  // Register a new user
  userRegister(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, userData);
  }

  // Login a user
  userLogin(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, userData);
  }

  // Create a new post
  createPost(addpost: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/addpost`, addpost);
  }

  // Fetch all posts
  getPosts(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getPosts`);
  }

  // Update a post
  updatePost(post: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/updatePost`, post);
  }

   // Delete a post
   deletePost(postId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/deletePost`, { postId });
  }
  
}
