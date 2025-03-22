import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Complain } from './product';

@Injectable({
  providedIn: 'root'
})
export class NgserviceService {

  constructor(private _http: HttpClient) {}

  fetchProductListFromRemote(): Observable<any> {
    return this._http.get<any>("http://localhost:8091/user/getcomplainlist");
  }

  fetchComplaintsByStatusFromRemote(status: string): Observable<any> {
    return this._http.get<any>(`http://localhost:8091/user/getcomplaints/status/${status}`);
  }
  
  addproductToRemote(product: Complain): Observable<any> {
    return this._http.post<any>("http://localhost:8091/user/addcomplain", product);
  }

  fetchProductByIdFromRemote(complainId: number): Observable<any> {
    return this._http.get<any>("http://localhost:8091/user/getcomplainbyid/" + complainId);
  }

  deleteProductByIdFromRemote(complainId: number, reason: string): Observable<any> {
    return this._http.delete<any>(`http://localhost:8091/user/deletecomplainbyid/${complainId}?reason=${reason}`);
  }

  // Method to update the product (complain) using PUT
  updateProductToRemote(id: number, product: Complain): Observable<any> {
    return this._http.put<any>(`http://localhost:8091/user/updatecomplain/${id}`, product);  // PUT request for updating the product
  }

  // Method to update status for all complaints
  updateComplaintsStatus(complaints: Complain[]): Observable<any> {
    return this._http.put<any>("http://localhost:8091/user/updatecomplaintsstatus", complaints);
  }


  getDashboardMetrics(): Observable<any> {
    return this._http.get(`http://localhost:8091/user/dashboard-metrics`);
  }
}
