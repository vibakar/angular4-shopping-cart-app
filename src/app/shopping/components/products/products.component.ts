import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs';
import { DOCUMENT } from '@angular/platform-browser';

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

  constructor(@Inject(DOCUMENT) private document: Document, private productService: ProductService, private route:ActivatedRoute, private shoppingCartService:ShoppingCartService) { 
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
  
  goToTop(){
    window.scrollTo(0, 0);
  }

}
