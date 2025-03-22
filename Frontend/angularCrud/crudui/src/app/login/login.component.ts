import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginData = {
    username: '',
    password: ''
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  Message='';
  roles: string[] = [];
  
  constructor(private authService: AuthService, private router: Router, private storageService: StorageService) {}




  login(): void {
    this.authService.login(this.loginData).subscribe(
      data => {
        console.log(data);
        this.storageService.saveToken(data.accessToken);
        this.storageService.saveUser(data);
        console.log(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.storageService.getUser().roles;
        
        Swal.fire('Login Success', 'Welcome Back' + ' ' + this.storageService.getUser().username, 'success').then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['']).then(() => {
                window.location.reload();
                }); 
          }
        });
      },
      (error) => {
        console.log(error);
        this.isLoginFailed = true;
        Swal.fire('Oops', "Invalid username/Password", 'error');
      }
      
    );
   
  }
}
