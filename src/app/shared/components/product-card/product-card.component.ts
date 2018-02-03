import { Component, Input } from '@angular/core';
import { Product } from 'shared/models/product';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product:Product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart;
  constructor(private shoppingCartService:ShoppingCartService) { }
  
  addToCart(){
  	this.shoppingCartService.addToCart(this.product);
  }

  removeFromCart(){
  	this.shoppingCartService.removeFromCart(this.product);
  }

  getQuantity(){
  	if(!this.shoppingCart) return 0;

  	let item = this.shoppingCart.items ? this.shoppingCart.items[this.product.$key] : null;
  	return item ? item.quantity : 0;
  }

}
