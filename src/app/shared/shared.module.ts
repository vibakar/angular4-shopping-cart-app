import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDialogModule, MatButtonModule } from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { ShoppingCartService } from './services/shopping-cart.service';
import { OrderService } from './services/order.service';
import { CategoryService } from './services/category.service';
import { ProductService } from './services/product.service';
import { UserService } from './services/user.service';
import { ModalService } from './services/modal.service';

import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    NgbModule,
    RouterModule,
    MatDialogModule,
    MatButtonModule
  ],
  declarations: [
    ProductCardComponent,
    ProductQuantityComponent,
    OrderDetailsComponent,
    ConfirmModalComponent
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
  	OrderService,
    ModalService
  ],
  entryComponents:[ConfirmModalComponent],
})
export class SharedModule { }
