import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  user = {
    username: '',
    email: '',
    roles: ['USER'],  // default role
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) {}


  goToLogin() {
    this.router.navigate(['/login']);
  }

  // Register the user
  register(): void {
    this.authService.registerUser(this.user).subscribe(
      response => {
        console.log('Registration successful', response);
        Swal.fire('Registration successful', "You have been registered successfully", 'success').then((result)=>{
          if (result.isConfirmed) {
            this.router.navigate(['/login']).then(() => {
                window.location.reload();
                }); 
              }
        });
        //this.router.navigate(['/login']);  
      },
      error => {
        console.error('Registration error', error);
        Swal.fire('Registration Failed', "You haven't been registered", 'error');
      }
    );
  }
}
