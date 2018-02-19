import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { MatSnackBar } from '@angular/material';

import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { OrderService } from 'shared/services/order.service';
import { AuthService } from 'shared/services/auth.service';
import { UserService } from 'shared/services/user.service';
import { ModalService } from 'shared/services/modal.service';

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
  address = [];

  constructor(private router:Router, private shoppingCartService: ShoppingCartService, private orderService: OrderService, private authService:AuthService, private spinnerService: Ng4LoadingSpinnerService, private userService:UserService, private modalService:ModalService, private snackbar: MatSnackBar){ }

  ngOnInit(){
    this.spinnerService.show();
    this.userSubscription = this.authService.user$.switchMap(user=>{
       this.userId=user.uid;
       this.shipping.name = user.displayName;
       return this.userService.get(user.uid)
    }).subscribe(u=>{
        if(u.address){
          this.isAddress = true;
          this.address = u.address;
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
      this.address.push(this.shipping);
      this.orderService.placeOrderWithNewAddress(order, this.userId, this.address).then((response)=>{
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

  deleteAddress(index){
    this.modalService.confirm('Confirm', 'Are you sure to delete this address?')
                     .subscribe(response=>{
                       if(response){
                         this.address.splice(index, 1);
                         this.userService.deleteAddress(this.userId, this.address).then(resp=>{
                               this.snackbar.open("Address Deleted Successfully!!", 'OK', {
                                  duration: 3000
                               }); 
                         });
                       }
                     });
  }

  ngOnDestroy() {
  	this.cartSubscription.unsubscribe();
  	this.userSubscription.unsubscribe();
  } 
}
