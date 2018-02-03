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
}
