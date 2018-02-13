import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { OrderService } from 'shared/services/order.service';

@Component({
  selector: 'app-my-order-details',
  templateUrl: './my-order-details.component.html',
  styleUrls: ['./my-order-details.component.css']
})
export class MyOrderDetailsComponent implements OnInit {

  constructor(private route:ActivatedRoute, private router: Router, private orderService: OrderService) { }
  $items;
  ngOnInit() {
  	let orderId = this.route.snapshot.paramMap.get('id');
  	this.$items = this.orderService.getOrdersById(orderId);
  }

   updateOrderStatus(orderId, status){
    this.orderService.updateOrderStatus(orderId, status);
    this.router.navigate(['/my/orders']);
  }

}
