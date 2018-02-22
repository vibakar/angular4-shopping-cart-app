import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class ProductService {
 
  constructor(private afdb:AngularFireDatabase) { 
  }
  
  create(product){
  	 return this.afdb.list('/products').push(product);
  }

  getAllProducts(){
  	return this.afdb.list('/products');
  }

  getProduct(productId){
  	return this.afdb.object('/products/'+productId);
  }

  updateProduct(productId, product){
  	return this.afdb.object('/products/'+productId).update(product);
  }

  deleteProduct(productId){
  	return this.afdb.object('/products/'+productId).remove();
  }

  getProductsByCategory(category){
    return this.afdb.list('/products', {
      query: {
        orderByChild: 'category',
        equalTo: category
      }
    })
  }
}
