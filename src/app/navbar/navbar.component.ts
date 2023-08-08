import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TestService } from '../test.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  
  usernamee:any;
  

  constructor(private service:TestService ,private jwtHelper: JwtHelperService){
    

  }
  ngOnInit(): void {
  
  
}

ok:Boolean=true;
  okk:Boolean=false;
  signup(){
    this.ok=false;
    this.okk=true;
  }
  signout(){
    this.ok=true;
    this.okk=false;
  }


  isUserAuthenticated = (): boolean => {
    const token = localStorage.getItem("jwt");
  
    if (token && !this.jwtHelper.isTokenExpired(token)){
      return true;
    }
  
    return false;
  }
  
  logOut = () => {
    localStorage.removeItem("jwt");
  }
}




