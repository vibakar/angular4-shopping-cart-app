import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { OrderService } from 'shared/services/order.service';

@Component({
  selector: 'app-admin-order-details',
  templateUrl: './admin-order-details.component.html',
  styleUrls: ['./admin-order-details.component.css']
})
export class AdminOrderDetailsComponent implements OnInit {

  constructor(private route:ActivatedRoute, private router: Router, private orderService: OrderService) { }
  $items;
  ngOnInit() {
  	let orderId = this.route.snapshot.paramMap.get('id');
  	this.$items = this.orderService.getOrdersById(orderId);
  }

   updateOrderStatus(orderId, status){
    this.orderService.updateOrderStatus(orderId, status);
    this.router.navigate(['/admin/orders']);
  }
}
