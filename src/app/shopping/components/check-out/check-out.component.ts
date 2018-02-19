import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { OrderService } from 'shared/services/order.service';
import { AuthService } from 'shared/services/auth.service';
import { UserService } from 'shared/services/user.service';


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
  isAddress;
  newAddress = [];

  constructor(private router:Router, private shoppingCartService: ShoppingCartService, private orderService: OrderService, private authService:AuthService, private spinnerService: Ng4LoadingSpinnerService, private userService:UserService){ }

  ngOnInit(){
    this.spinnerService.show();
    this.userSubscription = this.authService.user$.switchMap(user=>{
       this.userId=user.uid;
       this.shipping.name = user.displayName;
       return this.userService.get(user.uid)
    }).subscribe(u=>{
        if(u.address){
          this.isAddress = true;
          this.newAddress = u.address;
        } else {
          this.isAddress = false;
        }
     });

  	this.cartSubscription= this.shoppingCartService.getCart().subscribe(cart=>{
      this.spinnerService.hide();
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

  placeOrder(type) {
    this.spinnerService.show();
    let date = new Date();
    let order = {
    	userId: this.userId,
    	datePlaced: date.getDate()+'-'+(date.getMonth()+1)+'-'+date.getFullYear(),
    	shipping: this.shipping,
    	items: this.items,
      status: 'waiting for shipping'
    }
    if(type == 'new'){
      this.newAddress.push(this.shipping);
      this.orderService.placeOrderWithNewAddress(order, this.userId, this.newAddress).then((response)=>{
        this.spinnerService.hide();
        this.shoppingCartService.clearCart();
        this.router.navigate(['/order-success',response.key]);
      });
    } else {
      this.orderService.placeOrderWithExistingAddress(order).then((response)=>{
        this.spinnerService.hide();
        this.shoppingCartService.clearCart();
        this.router.navigate(['/order-success',response.key]);
      });
    }

  }

  addNewAddress(){
    this.isAddress = false;
  }

  cancelAddAddress(){
    this.isAddress = true;
  }

  ngOnDestroy() {
  	this.cartSubscription.unsubscribe();
  	this.userSubscription.unsubscribe();
  } 
}
