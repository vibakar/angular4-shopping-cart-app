import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

import { ProductService } from 'shared/services/product.service';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Product } from 'shared/models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  cart$: Observable<Product>;
  p:number = 1;

  constructor(private productService: ProductService, private route:ActivatedRoute, private shoppingCartService:ShoppingCartService, private spinnerService: Ng4LoadingSpinnerService) { 
  }

  ngOnInit() {
    this.getProductList();
    this.cart$ = this.shoppingCartService.getCart();
  }

  getProductList(){
    this.spinnerService.show();
    this.productService.getAllProducts().switchMap(p=>{
      this.filteredProducts = this.products = p;
      return this.route.queryParamMap;
    })
    .subscribe((params)=>{
      this.spinnerService.hide();
      this.category = params.get('category');
      this.filteredProducts = this.category ? this.products.filter((p)=>p.category===this.category) : this.products;
    });
  }
  
  goToTop(){
    window.scrollTo(0, 0);
  }

}
