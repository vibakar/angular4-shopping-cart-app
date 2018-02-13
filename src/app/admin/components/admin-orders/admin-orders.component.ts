import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from 'shared/services/order.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit, OnDestroy {
  orders;
  filteredOrders = [];
  status:string = 'all';
  subscription:Subscription;
  p:number = 1;
  constructor(private orderService: OrderService, private router: Router) { }

  ngOnInit() {
  	this.subscription = this.orderService.getOrders().subscribe(o=>{
      this.orders = o;
      this.filteredOrders = o;
    });
  }

  viewOrder(orderId){
  	this.router.navigate(['admin/order', orderId]);
  }

  processShipping(orderId, status){
    this.orderService.updateOrderStatus(orderId, status);
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
