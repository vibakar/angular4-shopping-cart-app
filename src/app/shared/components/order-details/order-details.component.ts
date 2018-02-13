import { Component, Input } from '@angular/core';

@Component({
  selector: 'order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent {

  constructor() { }
  @Input('items') items;

  getTotal(order){
  	let total = 0;
  	order.items.forEach(product=>{
  		total += product.totalPrice;
  	})
  	return total;
  }
}
