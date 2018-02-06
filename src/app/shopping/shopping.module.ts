import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { ProductsComponent } from './components/products/products.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { ProductsFilterComponent } from './components/products/products-filter/products-filter.component';
import { OrderDetailsComponent } from 'shared/components/order-details/order-details.component';
import { AuthGuardService } from 'shared/services/auth-guard.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
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
      path: 'orders/:id',
      component: OrderDetailsComponent,
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
    ProductsFilterComponent
  ]
})
export class ShoppingModule { }
