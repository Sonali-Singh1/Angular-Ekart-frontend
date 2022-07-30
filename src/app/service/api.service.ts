import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  // getProduct(){
  //   return this.http.get<any>("https://fakestoreapi.com/products")
  //   .pipe(map((res:any)=>{
  //     return res;
  //   }))
  // }
  getProducts(){
    return this.http.get<any>("http://localhost:8000/product/all")
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  getProduct(id:any){
    return this.http.get<any>("http://localhost:8000/product/"+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  getCards(id:any){
    return this.http.get<any>("http://localhost:8200/card/all?customerId="+id)
    .pipe(map((res:any)=>{
      return res;
    }))

  }
  addCard(card:any){
    return this.http.post<any>("http://localhost:8200/card/add",card).pipe(catchError(this.handleError))
  }
  
  private handleError(err: HttpErrorResponse) {
    let errMsg = '';
    if(err.error instanceof Error)  {
      console.log('An error:', err.error.message)
      errMsg = err.error.message
    }
    else {
      console.log(`Backend error: ${err.status}`)
      errMsg = err.error.status
    }
    return throwError(errMsg)
  }
}
