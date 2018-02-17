import { Component, OnDestroy } from '@angular/core';
import { Subscription }  from 'rxjs/Subscription';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { MatSnackBar } from '@angular/material';

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
  
  constructor(private productService:ProductService,private spinnerService: Ng4LoadingSpinnerService, private modalService:ModalService, private snackbar: MatSnackBar) { 
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
                          this.snackbar.open(`Product "${product.title}" deleted!!`, 'OK', {
                            duration: 3000
                          });                          
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
