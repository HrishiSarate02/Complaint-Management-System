import { Injectable } from '@angular/core';


const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {}
  isLoggedIn = false;
 
  signOut():void{
    window.sessionStorage.clear();
  
  }

  public saveToken(token:string):void{
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY,token);
  }

  public getToken():any{
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: any):void{
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY,JSON.stringify(user)); 
  }

  public isUserLoggedIn(){
    this.isLoggedIn = !!this.getToken();
    return this.isLoggedIn;
  }
  

  public getUser() {
    const userJson = sessionStorage.getItem(USER_KEY);
    if (userJson !== null) {
      return JSON.parse(userJson);
    }
    return null; // or handle the case when userJson is null
  }
  
}