import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  shoppingCartItemCount:number = 0;
  items = [];
  totalPrice:number;
  cart;
  constructor(private shoppingCartService:ShoppingCartService) { }

  ngOnInit() {
  	this.shoppingCartService.getCart().subscribe(cart=>{
  	  this.cart = cart;
      this.shoppingCartItemCount = 0;
      this.totalPrice = 0;
      this.items = [];
      for(let productId in cart.items) {
      	if(cart.items[productId].quantity > 0) {
      		let x = cart.items[productId];
      		x.$key = productId;
      		this.items.push(x);
      	}
        this.shoppingCartItemCount += cart.items[productId].quantity;
        this.totalPrice += (cart.items[productId].price * cart.items[productId].quantity);
      }
    });
  }

  removeFromCart(product){
  	this.shoppingCartService.removeFromCart(product);
  }

  addToCart(product){
  	this.shoppingCartService.addToCart(product);
  }

}
