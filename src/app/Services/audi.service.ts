import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { tokenGetter } from "../app.module";

@Injectable({
    providedIn: 'root'
  })
  export class AudiService {

    baseUrl: string = environment.baseUrl;
    constructor(private http: HttpClient) { }
    getMoviesByTheatre(theatreId : string) {
        let queryParams = new HttpParams();
        queryParams = queryParams.append("id",theatreId);
        
     
        return this.http.get<any>(this.baseUrl + 'api/Audi/GetMoviesByTheatreId',{params : queryParams});
       
    }

    getTheatresByMovies(movieId : any)
    {
      var key = tokenGetter();
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`
      });

      let queryParams = new HttpParams();
      queryParams = queryParams.append("id", movieId);
      
   
      return this.http.get<any>(this.baseUrl + 'api/Audi/GetTheatresByMovieId',{ headers: headers, params : queryParams, });
    }
    
    getShowDatesAndTimings(movieId:any, theatreId :any)
    {
      let queryParams = new HttpParams();
      queryParams = queryParams.append("movieId", movieId); 
      queryParams = queryParams.append("theatreId", theatreId); 

      return this.http.get<any>(this.baseUrl + 'api/Audi/GetShowDatesandTimings', {params : queryParams})


    }
    getSeats(audiId : any)
    {
      let queryParams = new HttpParams();
      queryParams = queryParams.append("audiId", audiId);
      
   
      return this.http.get<any>(this.baseUrl + 'api/Audi/GetSeatsByAudiId',{params : queryParams});

    }

  }