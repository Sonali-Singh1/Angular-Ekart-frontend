import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SignupService {
  constructor(private http: HttpClient) { }
  
  getAllUsers(): Observable<any>{
    return this.http.get<any>('http://localhost:8081/user/all')
  }
  addUsers(user: any): Observable<any>{
    return this.http.post<any>('http://localhost:8081/user/add',user)
  }
}
