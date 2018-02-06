import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { OrderService } from 'shared/services/order.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  constructor(private route:ActivatedRoute, private orderService: OrderService) { }
  $items;
  ngOnInit() {
  	let orderId = this.route.snapshot.paramMap.get('id');
  	this.$items = this.orderService.getOrdersById(orderId);
  }

  getTotal(order){
  	let total = 0;
  	order.items.forEach(product=>{
  		total += product.totalPrice;
  	})
  	return total;
  }
}
