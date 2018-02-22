import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class CategoryService {

  constructor(private afdb:AngularFireDatabase) { }

  getAllCategories(){
  	return this.afdb.list('/categories', {
  		query: {
  			orderByChild: 'name'
  		}
  	});
  }

  addCategory(category){
  	var name = category.name.toLowerCase();
  	var key = name.replace(/\s/g,'');
  	return this.afdb.object(`/categories/${key}`).set(category);
  }

  deleteCategory(key) {
    return this.afdb.object(`/categories/${key}`).remove();
  }
}
