import { Component,Input } from '@angular/core';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Product } from 'shared/models/product';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent {
  @Input('product') item;
  @Input('shopping-cart') shoppingCart;

  constructor(private shoppingCartService:ShoppingCartService) { }
  
  addToCart(){
  	this.shoppingCartService.addToCart(this.item);
  }

  removeFromCart(){
  	this.shoppingCartService.removeFromCart(this.item);
  }

  getQuantity(){
  	let item = this.shoppingCart.items[this.item.$key];
  	return item ? item.quantity : 0;
  }
}
