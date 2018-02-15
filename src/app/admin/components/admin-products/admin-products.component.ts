import { Component, OnDestroy } from '@angular/core';
import { Subscription }  from 'rxjs/Subscription';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

import { Product } from 'shared/models/product';
import { ProductService } from 'shared/services/product.service';
import { ModalService } from 'shared/services/modal.service';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnDestroy{
  products: Product[];
  subscription: Subscription;
  filteredProducts: any[] = [];
  p:number = 1;
  
  constructor(private productService:ProductService,private spinnerService: Ng4LoadingSpinnerService, private modalService:ModalService) { 
    this.spinnerService.show();
    this.subscription = this.productService.getAllProducts()
                          .subscribe((p)=>{
                            this.spinnerService.hide();
                            return this.filteredProducts = this.products = p
                          });
  }

  deleteProduct(product){
    this.modalService.confirm('Warning', `Are you sure to delete "${product.title}"?`)
                     .subscribe((response)=>{
                        if(response){
                          this.productService.deleteProduct(product.$key);                          
                        }
                      });
  }

  filter(query: string){
    this.filteredProducts = this.products.filter(p=>p.title.toLowerCase().includes(query.toLowerCase()));
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
