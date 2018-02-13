import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { ShoppingCartService } from './services/shopping-cart.service';
import { OrderService } from './services/order.service';
import { CategoryService } from './services/category.service';
import { ProductService } from './services/product.service';
import { UserService } from './services/user.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OrderDetailsComponent } from './components/order-details/order-details.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    RouterModule
  ],
  declarations: [
    ProductCardComponent,
    ProductQuantityComponent,
    OrderDetailsComponent
  ],
  exports: [
    ProductCardComponent,
    ProductQuantityComponent,
    OrderDetailsComponent
  ],
  providers: [
  	AuthService,
  	AuthGuardService,
  	UserService,
  	CategoryService,
  	ProductService,
  	ShoppingCartService, 
  	OrderService
  ]
})
export class SharedModule { }
