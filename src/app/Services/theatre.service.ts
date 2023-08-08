import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
  })
  export class TheatreService {

    baseUrl: string = environment.baseUrl;
    constructor(private http: HttpClient) { }
    getTheatreByLocation(location : string) {
        let queryParams = new HttpParams();
        queryParams = queryParams.append("Location",location);
        
     
        return this.http.get<any>(this.baseUrl + 'api/Theatre/GetTheatresByLocation',{params : queryParams});
       
    }


  }