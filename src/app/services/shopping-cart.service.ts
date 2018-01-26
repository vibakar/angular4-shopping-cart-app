import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/take';

@Injectable()
export class ShoppingCartService {

  constructor(private afdb:AngularFireDatabase) { }

  private create(){
  	return this.afdb.list('/shopping-cart').push({
  		createdAt: new Date().getTime()
  	});
  }

  getCart(){
  	let cartId = this.getOrCreateCartId();
  	return this.afdb.object('/shopping-cart/'+cartId);
  }

  private getOrCreateCartId(){
  	let cartId = localStorage.getItem('cartId');
  	if(cartId) return cartId;

	this.create().then((response)=>{
		localStorage.setItem('cartId', response.key);
		return response.key;
	});	
  }

  addToCart(product: Product){
  	this.updateItemQuantity(product, 1);
  }

  removeFromCart(product: Product){
  	this.updateItemQuantity(product, -1);
  }

  private updateItemQuantity(product:Product, change:number){
  	let cartId = this.getOrCreateCartId();
  	let item$ = this.afdb.object('/shopping-cart/'+cartId+'/items/'+product.$key);
  	item$.take(1).subscribe(item=>{
  		 item$.update({product:product, quantity: (item.quantity || 0) + change});
  	})
  }
}
