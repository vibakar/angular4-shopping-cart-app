import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

import { ShoppingCartService } from '../services/shopping-cart.service';
import { OrderService } from '../services/order.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy{ 
  shipping = {
  	name: '',
  	addressLine1: '',
  	addressLine2: '',
  	city: ''
  }; 
  cartSubscription:Subscription;
  userSubscription: Subscription;
  items = [];
  userId:string;
  totalPrice:number = 0;
  totalQuantity:number = 0;

  constructor(private router:Router, private shoppingCartService: ShoppingCartService, private orderService: OrderService, private authService:AuthService){ }

  ngOnInit(){
  	this.userSubscription = this.authService.user$.subscribe(user=>this.userId=user.uid);
  	let cart$ = this.shoppingCartService.getCart();
  	this.cartSubscription= cart$.subscribe(cart=>{
      this.totalQuantity = 0;
      this.totalPrice = 0;
	  	for(let pid in cart.items){
	  		if(cart.items[pid].quantity > 0){
	  			let p = cart.items[pid];
          this.totalQuantity += p.quantity;
          this.totalPrice += p.quantity * p.price;
	  			this.items.push({
		  			product: {
		  				title: p.title,
	    				price: p.price,
	    				imageUrl: p.imageUrl
		  			},
		  			quantity: p.quantity,
		  			totalPrice: p.quantity * p.price
		  		})
	  		}
	  	}
  	});
  }

  placeOrder() {
    let date = new Date();
    let order = {
    	userId: this.userId,
    	datePlaced: date.getDate()+'-'+(date.getMonth()+1)+'-'+date.getFullYear(),
    	shipping: this.shipping,
    	items: this.items
    }
    this.orderService.placeOrder(order).then((response)=>{
      this.shoppingCartService.clearCart();
    	this.router.navigate(['/order-success',response.key]);
    });
  }   

  ngOnDestroy() {
  	this.cartSubscription.unsubscribe();
  	this.userSubscription.unsubscribe();
  } 
}
