import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { OrderService } from 'shared/services/order.service';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from 'shared/services/auth.service';
import 'rxjs/add/operator/map';

@Component({
  selector: 'order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  constructor(private route:ActivatedRoute, private orderService: OrderService, private router: Router, private authService: AuthService) { }
  $items;
  isAdmin:boolean;
  ngOnInit() {
    this.authService.appUser$.subscribe(user=>{
      if(user.isAdmin){
        this.isAdmin = true;
      } else{
        this.isAdmin = false;
      }
    });
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

  processShipping(orderId){
    this.orderService.updateOrderStatus(orderId);
    this.router.navigate(['/admin/orders']);
  }
}
