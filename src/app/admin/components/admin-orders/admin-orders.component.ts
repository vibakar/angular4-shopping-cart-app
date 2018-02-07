import { Component, OnInit } from '@angular/core';
import { OrderService } from 'shared/services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
  orders$;
  constructor(private orderService: OrderService, private router: Router) { }

  ngOnInit() {
  	this.orders$ = this.orderService.getOrders();
  }

  viewOrder(orderId){
  	this.router.navigate(['/orders', orderId]);
  }

}
