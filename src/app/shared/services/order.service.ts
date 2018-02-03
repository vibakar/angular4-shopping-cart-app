import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class OrderService {

  constructor(private afdb:AngularFireDatabase) { }

  placeOrder(order){
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

  getOrders(){
  	return this.afdb.list('/orders');
  }
}
