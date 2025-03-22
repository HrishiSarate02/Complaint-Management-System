import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isLoggedIn= false;
  private roles: string[] = [];
  constructor( private router: Router, private storageService: StorageService) {}
  showProducts = false;
  showAdmin = false;

  ngOnInit(): void {
    this.isLoggedIn = !!this.storageService.getToken();
    if (this.isLoggedIn) {
      this.showProducts = true;
      const user = this.storageService.getUser();
      this.roles = user.roles;
      this.showAdmin = this.roles.includes('ROLE_ADMIN');
    }

  }
  
  onLogout() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to log out. Are you sure you want to continue?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log out',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.storageService.signOut();
        this.router.navigate(['login']).then(() => {
          window.location.reload();
        });
      }
    });
  }
  
}
