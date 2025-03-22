import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductlistComponent } from './productlist/productlist.component';
import { EditproductComponent } from './editproduct/editproduct.component';
import { ViewproductComponent } from './viewproduct/viewproduct.component';
import { HttpClientModule } from '@angular/common/http';
import { AddproductComponent } from './addproduct/addproduct.component';
import { FormsModule } from "@angular/forms";
import { NgserviceService } from './ngservice.service';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './register/register.component';
import { FrontpageComponent } from './frontpage/frontpage.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoggedComplaintsComponent } from './logged-complaints/logged-complaints.component';
import { AssignedComplaintsComponent } from './assigned-complaints/assigned-complaints.component';
import { DoneComplaintsComponent } from './done-complaints/done-complaints.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductlistComponent,
    EditproductComponent,
    ViewproductComponent,
    AddproductComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    FrontpageComponent,
    DashboardComponent,
    LoggedComplaintsComponent,
    AssignedComplaintsComponent,
    DoneComplaintsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatCardModule,
    BrowserAnimationsModule
  ],
  providers: [NgserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
