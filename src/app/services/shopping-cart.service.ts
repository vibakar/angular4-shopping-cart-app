import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';

import { Product } from '../models/product';
import { ShoppingCart } from '../models/shopping-cart';

@Injectable()
export class ShoppingCartService {

  constructor(private afdb:AngularFireDatabase) { }

  getCart(){
    let cartId =  this.getOrCreateCartId();
    return this.afdb.object('/shopping-cart/'+cartId);
  }

  addToCart(product: Product){
    this.updateItem(product, 1);
  }

  removeFromCart(product: Product){
    this.updateItem(product, -1);
  }

  clearCart(){
    let cartId = this.getOrCreateCartId();
    this.afdb.object('/shopping-cart/'+cartId+'/items').remove();
  }

  private create(){
  	return this.afdb.list('/shopping-cart').push({
  		createdAt: new Date().getTime()
  	});
  }

  private getOrCreateCartId(){
  	let cartId = localStorage.getItem('cartId');
  	if(cartId) return cartId;

  	this.create().then((response)=>{
  		localStorage.setItem('cartId', response.key);
  		return response.key;
  	});	
  }

  private updateItem(product:Product, change:number){
  	let cartId = this.getOrCreateCartId();
  	let item$ = this.afdb.object('/shopping-cart/'+cartId+'/items/'+product.$key);
  	item$.take(1).subscribe(item=>{
  		 item$.update({
                     title: product.title,
                     price: product.price,
                     imageUrl: product.imageUrl,
                     quantity: (item.quantity || 0) + change
                  });
  	})
  }
}
