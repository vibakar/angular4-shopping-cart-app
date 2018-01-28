import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class OrderService {

  constructor(private afdb:AngularFireDatabase) { }

  storeOrder(order){
  	return this.afdb.list('/orders').push(order);
  }
}
