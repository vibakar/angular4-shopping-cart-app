import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';
import { AuthGuardService } from 'shared/services/auth-guard.service';
import { SharedModule } from '../shared/shared.module';
import { AdminOrderDetailsComponent } from './components/admin-order-details/admin-order-details.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    NgxPaginationModule,
    RouterModule.forChild([{
      path: 'admin/products/new',
      component: ProductFormComponent,
      canActivate: [AuthGuardService, AdminAuthGuardService]
    }, {
      path: 'admin/products/:id',
      component: ProductFormComponent,
      canActivate: [AuthGuardService, AdminAuthGuardService]
    }, {
      path: 'admin/products',
      component: AdminProductsComponent,
      canActivate: [AuthGuardService, AdminAuthGuardService]
    }, {
      path: 'admin/order/:id',
      component: AdminOrderDetailsComponent,
      canActivate: [AuthGuardService, AdminAuthGuardService]
    }, {
      path: 'admin/orders',
      component: AdminOrdersComponent,
      canActivate: [AuthGuardService, AdminAuthGuardService]
    }])
  ],
  declarations: [
  	AdminOrdersComponent,
  	AdminProductsComponent,
  	ProductFormComponent,
  	AdminOrderDetailsComponent
  ],
  providers: [
  	AdminAuthGuardService
  ]
})
export class AdminModule { }
