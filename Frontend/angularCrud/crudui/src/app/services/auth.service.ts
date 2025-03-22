import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient,private router:Router){
  }

  registerUser(user:{username:any,email:any,roles:any[],password:any}):Observable<any>{
      console.log(user);
      return this.httpClient.post<any>('http://localhost:9098/api/auth/signup',{
          username:user.username,
          email:user.email,
          roles:user.roles,
          password:user.password
      });
  }

  login(login:{username:any,password:any}):Observable<any>{
      return this.httpClient.post('http://localhost:9098/api/auth/signin',login);
  }

}
