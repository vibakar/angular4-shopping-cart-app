import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

import { ProductsComponent } from './components/products/products.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { ProductsFilterComponent } from './components/products/products-filter/products-filter.component';
import { AuthGuardService } from 'shared/services/auth-guard.service';
import { MyOrderDetailsComponent } from './components/my-order-details/my-order-details.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    NgxPaginationModule,
    Ng4LoadingSpinnerModule.forRoot(),
    RouterModule.forChild([{
      path: 'products',
      component: ProductsComponent
    }, {
      path: 'shopping-cart',
      component: ShoppingCartComponent
    }, {
      path: 'check-out',
      component: CheckOutComponent,
      canActivate: [AuthGuardService]
    }, {
      path: 'my/orders/:id',
      component: MyOrderDetailsComponent,
      canActivate: [AuthGuardService]
    }, {
      path: 'my/orders',
      component: MyOrdersComponent,
      canActivate: [AuthGuardService]
    }, {
      path: 'order-success/:id',
      component: OrderSuccessComponent,
      canActivate: [AuthGuardService]
    }])
  ],
  declarations: [
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    ProductsFilterComponent,
    MyOrderDetailsComponent
  ]
})
export class ShoppingModule { }
