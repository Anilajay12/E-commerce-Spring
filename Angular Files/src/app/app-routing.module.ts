import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { IndexComponent } from './components/index/index.component';
import { LoginComponent } from './components/login/login.component';
import { ManageOrdersComponent } from './components/manage-orders/manage-orders.component';
import { MyorderComponent } from './components/myorder/myorder.component';
import { OrderrequestsComponent } from './components/orderrequests/orderrequests.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { CartComponent } from './components/user/cart/cart.component';
import { EmployeeComponent } from './components/user/employee/employee.component';
import { HomepageComponent } from './components/user/homepage/homepage.component';
import { ProductComponent } from './components/user/product/product.component';

const routes: Routes = [
   {path:"login",component:LoginComponent},
   {path:"register",component:RegisterComponent},
   {path:'',component:IndexComponent},
   {path:'home',component:HomepageComponent,canActivate:[AuthGuard]},
   {path:'employees',component:EmployeeComponent,canActivate:[AuthGuard]},
   {path:'products',component:ProductComponent,canActivate:[AuthGuard]},
   {path:'profile',component:ProfileComponent,canActivate:[AuthGuard]},
   {path:'cart',component:CartComponent},
   {path:'orders',component:OrderrequestsComponent,canActivate:[AuthGuard]},
   {path:'myorders',component:MyorderComponent,canActivate:[AuthGuard]},
   {path:"allorders",component:ManageOrdersComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
