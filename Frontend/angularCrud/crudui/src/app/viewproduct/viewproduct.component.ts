import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {NgForm} from '@angular/forms';
import { NgserviceService } from '../ngservice.service';
import { Complain } from '../product';
@Component({
  selector: 'app-viewproduct',
  templateUrl: './viewproduct.component.html',
  styleUrls: ['./viewproduct.component.css']
})
export class ViewproductComponent {

  public product: Complain = new Complain(0, "", "", "", "", 0, 0, "","", "", "", "", "");


  constructor(private  _route:Router,private _service: NgserviceService,private _activatedRoute : ActivatedRoute) {}

  ngOnInit() {

    let id = parseInt(this._activatedRoute.snapshot.paramMap.get('id')|| '', 10);  //to fetch values from database
    
    this._service.fetchProductByIdFromRemote(id).subscribe(
      {
        next: (data) => {
          console.log("data recieved");
          this.product=data;
        },
        error: (error) => console.log("error occurred") 
      }
    )
  }

  gotolist(){
    console.log('go back');
    this._route.navigate(['productlist']);
  }
  

}
