import { Component, OnDestroy } from '@angular/core';
import { Subscription }  from 'rxjs/Subscription';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { MatSnackBar } from '@angular/material';

import { Product } from 'shared/models/product';
import { ProductService } from 'shared/services/product.service';
import { ModalService } from 'shared/services/modal.service';
import { CategoryService } from 'shared/services/category.service';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnDestroy{
  categories$;
  products: Product[];
  subscription: Subscription;
  filteredProducts: any[] = [];
  currentCategory:string = 'all';
  searchValue:string = '';
  p:number = 1;
  
  constructor(private productService:ProductService,private categoryService:CategoryService, private spinnerService: Ng4LoadingSpinnerService, private modalService:ModalService, private snackbar: MatSnackBar) { 
    this.spinnerService.show();
    this.subscription = this.productService.getAllProducts()
                          .subscribe((p)=>{
                            this.spinnerService.hide();
                            return this.filteredProducts = this.products = p
                          });
    this.categories$ = this.categoryService.getAllCategories();
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

  searchByTitle(){
    if(this.currentCategory == 'all'){
      this.filteredProducts = this.products.filter(p=>p.title.toLowerCase().includes(this.searchValue.toLowerCase()));
    } else {
      this.filteredProducts = this.products.filter((p=>{
       return p.category.toLowerCase() == this.currentCategory.toLowerCase() && p.title.toLowerCase().includes(this.searchValue.toLowerCase());
     }))
    }
  }

   filterByCategory(category) {
     this.searchValue = '';
    if(category === 'all'){
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter((p=>{
       return p.category.toLowerCase() == category.toLowerCase();
     }))
    }
  }


  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
