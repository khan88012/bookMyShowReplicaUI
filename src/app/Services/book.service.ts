import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BookingRequest } from '../Models/bookingRequest';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAllMovies(): Observable<any>{
    console.log(this.baseUrl +'api/Movie');
    return this.http.get<any>(this.baseUrl +'api/Movie');
  }

  bookMovie(bookingRequest : BookingRequest): Observable<any>{
    console.log(this.baseUrl+'api/Audi/BookMovie');
    
    return this.http.post(this.baseUrl+'api/Audi/BookMovie', bookingRequest);
  }
}


