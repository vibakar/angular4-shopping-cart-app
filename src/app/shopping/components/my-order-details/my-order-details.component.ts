import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

import { OrderService } from 'shared/services/order.service';
import { ModalService } from 'shared/services/modal.service';

@Component({
  selector: 'app-my-order-details',
  templateUrl: './my-order-details.component.html',
  styleUrls: ['./my-order-details.component.css']
})
export class MyOrderDetailsComponent implements OnInit {

  constructor(private route:ActivatedRoute, private router: Router, private orderService: OrderService, private spinnerService: Ng4LoadingSpinnerService, private modalService:ModalService) { }
  $items;
  ngOnInit() {
    this.spinnerService.show();
  	let orderId = this.route.snapshot.paramMap.get('id');
  	this.$items = this.orderService.getOrdersById(orderId);
  }

  updateOrderStatus(orderId, status){
     this.modalService.confirm('Warning', 'Are you sure to cancel the order?')
                      .subscribe((response=>{
                         if(response){
                           this.orderService.updateOrderStatus(orderId, status);
                           this.router.navigate(['/my/orders']);
                         }
                       }));
  }

}
