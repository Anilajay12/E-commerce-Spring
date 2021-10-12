import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { IndexComponent } from './components/index/index.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { UserService } from './services/user.service';
import { NavbarComponent } from './components/navbar/navbar.component';

import { EmployeeComponent } from './components/user/employee/employee.component';
import { ProductComponent } from './components/user/product/product.component';
import { HomepageComponent } from './components/user/homepage/homepage.component';
import { ProfileComponent } from './components/profile/profile.component';

import { AuthGuard } from './auth.guard';


import { CartComponent } from './components/user/cart/cart.component';
import { CartService } from './services/cart.service';
import { OrderrequestsComponent } from './components/orderrequests/orderrequests.component';
import { MyorderComponent } from './components/myorder/myorder.component';
import { ManageOrdersComponent } from './components/manage-orders/manage-orders.component';
import { OrdersService } from './services/orders.service';
import { ApiService } from './services/api.service';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    IndexComponent,
    NavbarComponent,
    EmployeeComponent,
    ProductComponent,
    HomepageComponent,
    ProfileComponent,
    CartComponent,
    OrderrequestsComponent,
    MyorderComponent,
    ManageOrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    UserService,
    AuthGuard,
    OrdersService,
    CartService,
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
