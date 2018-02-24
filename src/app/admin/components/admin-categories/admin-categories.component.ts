import { Component, OnInit } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { MatSnackBar } from '@angular/material';

import { CategoryService } from 'shared/services/category.service';
import { ProductService } from 'shared/services/product.service';
import { ModalService } from 'shared/services/modal.service';


@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.css']
})
export class AdminCategoriesComponent implements OnInit {
  categories$;
  category = {
  	name: ''
  }
  p:number = 1;
  constructor(private categoryService:CategoryService,private productService:ProductService, private modalService:ModalService, private spinnerService: Ng4LoadingSpinnerService, private snackbar: MatSnackBar) { }

  ngOnInit() {
  	this.spinnerService.show();
  	this.categories$ = this.categoryService.getAllCategories();
  }

  save(category) {
  	this.categoryService.addCategory(category).then((response)=>{
  		this.category.name = '';
  		this.snackbar.open(`Category "${category.name}" Added!!`, 'OK', {
	        duration: 3000
	    });
  	})
  }

  deleteCategoryCheck(category){
    this.productService.getProductsByCategory(category.$key).subscribe((response)=>{
      if(response && response.length > 0){
        this.snackbar.open('Delete not allowed.Some products are available under this category', 'OK', {
          duration: 3000
        });
      } else {
        this.modalService.confirm('Warning', `Are you sure to delete "${category.name}" category?`)
            .subscribe((resp)=>{
             if(resp){
               this.categoryService.deleteCategory(category.$key).then((response)=>{
                  this.snackbar.open(`Category "${category.name}" deleted successfully!!`, 'OK', {
                    duration: 3000
                  });
              })
             }
           })
      }
    })
  }
}
