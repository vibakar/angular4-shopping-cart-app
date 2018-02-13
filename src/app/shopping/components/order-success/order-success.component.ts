import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css']
})
export class OrderSuccessComponent {
  orderId:string;
  constructor(private route:ActivatedRoute, private router: Router) {
  	this.orderId = this.route.snapshot.paramMap.get('id');
  }

  orderDetails(){
  	this.router.navigate(['/my/orders/', this.orderId]);
  }
}
