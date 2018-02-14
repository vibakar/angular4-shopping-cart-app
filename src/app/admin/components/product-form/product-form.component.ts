import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
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
   constructor(private categoryService:CategoryService, private productService:ProductService, private router:Router, private route: ActivatedRoute,private spinnerService: Ng4LoadingSpinnerService) { 
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
  	} else {
	  	this.productService.create(product);
  	}
  	this.router.navigate(['/admin/products']);
  }

  update(productId, product){
  	this.productService.updateProduct(productId, product);
  	this.router.navigate(['/admin/products']);
  }

}
