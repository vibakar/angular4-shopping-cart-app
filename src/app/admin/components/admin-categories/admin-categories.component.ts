import { Component, OnInit } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { MatSnackBar } from '@angular/material';

import { CategoryService } from 'shared/services/category.service';

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
  constructor(private categoryService:CategoryService, private spinnerService: Ng4LoadingSpinnerService, private snackbar: MatSnackBar) { }

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
}
