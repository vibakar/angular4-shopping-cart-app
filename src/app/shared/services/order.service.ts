import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

import { UserService } from 'shared/services/user.service';

@Injectable()
export class OrderService {

  constructor(private afdb:AngularFireDatabase, private userService:UserService) { }

  placeOrderWithNewAddress(order, userId, address){
  	return this.userService.saveAddress(userId, address).then((response)=>{
      return this.afdb.list('/orders').push(order);
    });
  }

  placeOrderWithExistingAddress(order){
      return this.afdb.list('/orders').push(order);
  }

  getOrdersByUser(userId){
  	return this.afdb.list('/orders', {
  		query: {
  			orderByChild: 'userId',
  			equalTo: userId
  		}
  	})
  }

  getOrdersById(orderId){
    return this.afdb.object('/orders/'+orderId);
  }

  getOrders(){
  	return this.afdb.list('/orders');
  }

  updateOrderStatus(orderId, status){
    return this.afdb.object('orders/'+orderId).update({
      status: status
    })
  }

}
