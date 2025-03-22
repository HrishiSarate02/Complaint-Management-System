import { Component } from '@angular/core';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-frontpage',
  templateUrl: './frontpage.component.html',
  styleUrls: ['./frontpage.component.css']
})
export class FrontpageComponent {
showProducts = false;
  isLoggedIn= false;
  private roles: string[] = [];

 constructor(private storageService: StorageService) {}

  ngOnInit() {
    this.isLoggedIn = !!this.storageService.getToken();
    
    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;
      this.showProducts = this.roles.includes('ROLE_ADMIN');
      

  }
  }
}
