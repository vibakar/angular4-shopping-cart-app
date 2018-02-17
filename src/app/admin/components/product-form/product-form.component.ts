import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { MatSnackBar } from '@angular/material';
import 'rxjs/add/operator/take';

import { CategoryService } from 'shared/services/category.service';
import { ProductService } from 'shared/services/product.service';
import { Product } from 'shared/models/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
   categories$;
   products$;
   product:Product = {
     title: '',
     price: 0,
     category: '',
     imageUrl: ''
   };
   productId;
   constructor(private categoryService:CategoryService, private productService:ProductService, private router:Router, private route: ActivatedRoute,private spinnerService: Ng4LoadingSpinnerService, private snackbar: MatSnackBar) { 
  	this.spinnerService.show();
    this.categories$ = this.categoryService.getAllCategories();
  	this.productId = this.route.snapshot.paramMap.get('id');
  	if(this.productId){
  		this.productService.getProduct(this.productId).take(1).subscribe(p=>{
        this.spinnerService.hide();
        return this.product=p;
      });
  	}else {
      this.spinnerService.hide();
    }
  }

  save(product){
  	if(this.productId){
  		this.productService.updateProduct(this.productId, product);
      this.snackbar.open(`Product "${product.title}" updated!!`, 'OK', {
        duration: 3000
      });
  	} else {
	  	this.productService.create(product);
      this.snackbar.open(`Product "${product.title}" added!!`, 'OK', {
        duration: 3000
      });
  	}
  	this.router.navigate(['/admin/products']);
  }

}
