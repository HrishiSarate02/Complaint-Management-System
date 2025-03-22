import { Component } from '@angular/core';
import { NgserviceService } from '../ngservice.service';  // Make sure you import your service
import { Complain } from '../product';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-assigned-complaints',
  templateUrl: './assigned-complaints.component.html',
  styleUrls: ['./assigned-complaints.component.css']
})
export class AssignedComplaintsComponent {
// Declare an array to hold the complaints data
public complaints: Complain[] = []; 

constructor(
  private _service: NgserviceService,  // Inject the service to interact with backend
  private _route: Router,
  private _activatedRoute: ActivatedRoute
) {}

ngOnInit(): void {
  // Since you are fetching data by status, we are not using id here. 
  // Call the service method to fetch complaints with 'Logged' status
  this.fetchComplaintsByStatus('Assigned');
}

// Method to fetch complaints by status
fetchComplaintsByStatus(status: string): void {
  this._service.fetchComplaintsByStatusFromRemote(status).subscribe(
    {
      next: (data) => {
        console.log("Complaints data received");
        this.complaints = data;  // Assign fetched data to the complaints array
      },
      error: (error) => {
        console.log("Error occurred while fetching complaints", error);
      }
    }
  );
}

// Optional: Navigate to another list if needed
gotolist(): void {
  console.log('Going back to list');
  this._route.navigate(['productlist']);
}
}
