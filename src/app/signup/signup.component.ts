import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TestService } from '../test.service';
import { Credential } from '../interfaces/Credential';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  document:any;
  credentials: Credential = {username:'', password:''};
  
  constructor(@Inject(DOCUMENT) document:Document,private router:Router,private service:TestService, private http : HttpClient){
    
 
  }

  ngOnInit(): void {
    
  }

  validate(): void {

    

    var username = (<HTMLInputElement>document.getElementById('username')).value.trim();
    var passInput = (<HTMLInputElement>document.getElementById('password')).value.trim();

  
    if(username == ''){
        alert("Username field can not be empty!");
    }else if(passInput ==''){
      alert("Password field can not be empty!");
    }else{
      this.router.navigate(['login']);
    }

        
  }

  signup(form : NgForm){
    console.log("this is form", form, this.credentials);
    if(form.valid)
    {
      this.http.post<string>("https://localhost:7079/api/Auth/Signup", this.credentials, {
        headers: new HttpHeaders({ "Content-Type": "application/json"})
      }).subscribe(
        {
          next: (response : string) => {
            console.log(response);
          }
        }
      )
    }
    
  }

}
