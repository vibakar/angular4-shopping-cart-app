import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

import { OrderService } from 'shared/services/order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit, OnDestroy {
  orders;
  filteredOrders = [];
  currentStatus:string = 'all';
  subscription:Subscription;
  p:number = 1;
  constructor(private orderService: OrderService, private router: Router,private spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
    this.spinnerService.show();
  	this.subscription = this.orderService.getOrders().subscribe(o=>{
      this.spinnerService.hide();
      this.orders = o;
      this.filteredOrders = o;
    });
  }

  viewOrder(orderId){
  	this.router.navigate(['admin/order', orderId]);
  }

  processShipping(orderId, status){
    this.orderService.updateOrderStatus(orderId, status);
    this.filterByStatus('waiting for shipping');
  }

  filterByStatus(status) {
    if(status === 'all'){
      this.filteredOrders = this.orders;
    } else {
      this.filteredOrders = this.orders.filter((order=>{
       return order.status.toLowerCase() === status;
     }))
    }
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
