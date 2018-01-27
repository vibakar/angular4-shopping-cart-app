import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs';

import { ProductService } from '../services/product.service';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Product } from '../models/product';

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

  constructor(private productService: ProductService, private route:ActivatedRoute, private shoppingCartService:ShoppingCartService) { 
  }

  ngOnInit() {
    this.getProductList();
    this.cart$ = this.shoppingCartService.getCart();
  }

  getProductList(){
    this.productService.getAllProducts().switchMap(p=>{
      this.filteredProducts = this.products = p;
      return this.route.queryParamMap;
    })
    .subscribe((params)=>{
      this.category = params.get('category');
      this.filteredProducts = this.category ? this.products.filter((p)=>p.category===this.category) : this.products;
    });
  }

}
