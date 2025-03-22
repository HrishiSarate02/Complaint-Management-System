import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgserviceService } from '../ngservice.service';
import { Complain } from '../product';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent implements OnInit {
  searchBy: string = 'id'; // Default search criteria
  searchTerm: string = ''; // User input for search
  showProducts = false;
  isLoggedIn= false;
  private roles: string[] = [];
  _productlist: Complain[] = [];
  filteredProductList: Complain[] = []; // List used for filtering

  constructor(private _service: NgserviceService, private _route: Router, private storageService: StorageService) {}

  ngOnInit() {
    this._service.fetchProductListFromRemote().subscribe(
      (data) => {
        console.log('Response received');
        this._productlist = data;
        this.filteredProductList = data; // Initialize filtered list
      },
      (error) => console.log('Exception occurred')
    );

    this.isLoggedIn = !!this.storageService.getToken();
    
    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;
      this.showProducts = this.roles.includes('ROLE_ADMIN');
    }
  }

  // Save status changes for all complaints
  saveStatusChanges() {
    console.log('Saving status changes...');
    this._service.updateComplaintsStatus(this._productlist).subscribe({
      next: (data) => {
        console.log('All status changes saved successfully');
        this.refreshProductList();
      },
      error: (error) => console.log('Error while saving status changes'),
    });
  }

  // Navigate to the Add Product Page
  goToAddProduct() {
    this._route.navigate(['/addproduct']);
  }

  // Navigate to the Edit Product Page with the provided complainId
  goToEditProduct(complainId: number) {
    console.log('Editing complaint with id ' + complainId);
    this._route.navigate(['/editproduct', complainId]);
  }

  // Navigate to the View Product Page with the provided complainId
  goToViewProduct(complainId: number) {
    console.log('Viewing complaint with id ' + complainId);
    this._route.navigate(['/viewproduct', complainId]);
  }

  // Delete the complaint with the provided complainId and prompt for reason
  deleteProduct(complainId: number) {
    const reason = prompt("Please provide the reason for deleting this complaint:");

    if (reason) {
      console.log('Deleting complaint with id ' + complainId);
      this._service.deleteProductByIdFromRemote(complainId, reason).subscribe({
        next: (data) => {
          console.debug('Deleted Successfully');
          this.refreshProductList();
        },
        error: (error) => console.log('Exception occurred while deleting'),
      });
    } else {
      console.log('Deletion cancelled. No reason provided.');
    }
  }

  // Refresh the complaint list after deletion or status update
  refreshProductList() {
    this._service.fetchProductListFromRemote().subscribe(
      (data) => {
        this._productlist = data;
        this.filteredProductList = data; // Update the filtered list as well
      },
      (error) => console.log('Error while refreshing the complaint list')
    );
  }

  filterComplaints() {
    const term = this.searchTerm.toLowerCase();

    this.filteredProductList = this._productlist.filter((complaint) => {
      switch (this.searchBy) {
        case 'id':
          return complaint.complainId.toString().includes(term);
        case 'subject':
          return complaint.complainSubject.toLowerCase().includes(term);
        case 'department':
          return complaint.dept.toLowerCase().includes(term);
        case 'building':
          return complaint.building.toLowerCase().includes(term);
        default:
          return false;
      }
    });
  }
}
