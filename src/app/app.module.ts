import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { LoginComponent } from './login/login.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AuthService } from './auth.service';
import { AuthGuardService } from './auth-guard.service';
import { AdminAuthGuardService } from './admin-auth-guard.service';
import { UserService } from './user.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    LoginComponent,
    AdminProductsComponent,
    AdminOrdersComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([{
      path: '',
      component: HomeComponent
    }, {
      path: 'products',
      component: ProductsComponent
    }, {
      path: 'shopping-cart',
      component: ShoppingCartComponent
    }, {
      path: 'login',
      component: LoginComponent
    }, {
      path: 'check-out',
      component: CheckOutComponent,
      canActivate: [AuthGuardService]
    }, {
      path: 'my/orders',
      component: MyOrdersComponent,
      canActivate: [AuthGuardService]
    }, {
      path: 'order-success',
      component: OrderSuccessComponent,
      canActivate: [AuthGuardService]
    },{
      path: 'admin/products',
      component: AdminProductsComponent,
      canActivate: [AuthGuardService, AdminAuthGuardService]
    }, {
      path: 'admin/orders',
      component: AdminOrdersComponent,
      canActivate: [AuthGuardService, AdminAuthGuardService]
    },{
      path: '**',
      redirectTo: '/',
      pathMatch: 'full'
    }])
  ],
  providers: [AuthService, AuthGuardService, UserService, AdminAuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
