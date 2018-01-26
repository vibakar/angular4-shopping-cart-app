import { Component, OnDestroy } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Subscription }  from 'rxjs/Subscription';
import { Product } from '../../models/product';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnDestroy{
  products: Product[];
  subscription: Subscription;
  filteredProducts: any[] = [];

  constructor(private productService:ProductService) { 
    this.subscription = this.productService.getAllProducts()
                          .subscribe((p)=>this.filteredProducts = this.products = p);
  }

  deleteProduct(productId){
  	this.productService.deleteProduct(productId);
  }

  filter(query: string){
    this.filteredProducts = this.products.filter(p=>p.title.toLowerCase().includes(query.toLowerCase()));
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
