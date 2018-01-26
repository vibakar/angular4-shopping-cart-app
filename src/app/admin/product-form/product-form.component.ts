import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
   categories$;
   products$;
   product = {};
   productId;
   constructor(private categoryService:CategoryService, private productService:ProductService, private router:Router, private route: ActivatedRoute) { 
  	this.categories$ = this.categoryService.getAllCategories();
  	this.productId = this.route.snapshot.paramMap.get('id');
  	if(this.productId){
  		this.productService.getProduct(this.productId).take(1).subscribe(p=>this.product=p);
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
