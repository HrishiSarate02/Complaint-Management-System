import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { NgserviceService } from '../ngservice.service';
import { Complain } from '../product';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent {

  public complaint: Complain = new Complain(0, "", "", "", "", 0, 0, "", "", "", "", "", "");

  constructor(private _route: Router, private _service: NgserviceService) {}

  ngOnInit() {}

  addProductformsubmit() {
    this._service.addproductToRemote(this.complaint).subscribe({
      next: (data) => {
        console.log("Complain added successfully: ", data);

        // Ensure SweetAlert shows up after successful response
        Swal.fire({
          title: 'Complain Added',
          text: 'Complain added successfully and confirmation has been sent on Email',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            console.log('Navigating to product list');
            this._route.navigate(['/productlist']).then(() => {
              // Optionally, reload the page after navigation
              window.location.reload();
            });
          }
        });
      },
      error: (error) => {
        console.log("Error occurred while adding complain: ", error);
        Swal.fire('Error', 'An error occurred while adding the complain.', 'error');
      }
    });
  }

  togglePriority(event: any) {
    this.complaint.priority = event.target.checked ? 'High' : 'Low';
  }

  gotolist() {
    console.log('go back');
    this._route.navigate(['productlist']);
  }
}
