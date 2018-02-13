import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { OrderService } from 'shared/services/order.service';
import { AuthService } from 'shared/services/auth.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  orders$;
  p:number = 1;
  constructor(private orderService:OrderService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
  	this.orders$ = this.authService.user$.switchMap(u=>this.orderService.getOrdersByUser(u.uid));
  }

  orderDetails(id){
  	this.router.navigate(['my/orders/',id]);
  }
}
