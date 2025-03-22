import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddproductComponent } from './addproduct/addproduct.component';
import { EditproductComponent } from './editproduct/editproduct.component';
import { ProductlistComponent } from './productlist/productlist.component';
import { ViewproductComponent } from './viewproduct/viewproduct.component';
import { LoginComponent } from './login/login.component';
import { AuthguardService } from './authguard.service';
import { RegisterComponent } from './register/register.component';
import { FrontpageComponent } from './frontpage/frontpage.component';
import { LoggedComplaintsComponent } from './logged-complaints/logged-complaints.component';
import { AssignedComplaintsComponent } from './assigned-complaints/assigned-complaints.component';
import { DoneComplaintsComponent } from './done-complaints/done-complaints.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
{path: '',component:FrontpageComponent} , 
{path: 'addproduct',component:AddproductComponent},
{path: 'login',component:LoginComponent},
{ path: 'register', component: RegisterComponent },
{path: 'editproduct/:id',component:EditproductComponent},
{path: 'editproduct',component:EditproductComponent},
{path: 'viewproduct/:id',component:ViewproductComponent},
{path: 'viewproduct',component:ViewproductComponent},
{path: 'productlist',component:ProductlistComponent},
{path: 'logged',component:LoggedComplaintsComponent},
{path: 'assigned',component:AssignedComplaintsComponent},
{path: 'done',component:DoneComplaintsComponent},
{path: 'dashboard',component:DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
