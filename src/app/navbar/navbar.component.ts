import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth.service';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { User } from '../models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  appUser:User;
  shoppingCartItemCount:number;
  constructor(private auth: AuthService,private shoppingCartService: ShoppingCartService) {
  	
  }

  ngOnInit() {
    this.auth.appUser$.subscribe(user=>this.appUser = user);
    this.shoppingCartService.getCart().subscribe(cart=>{
      this.shoppingCartItemCount = 0;
      for(let productId in cart.items) {
        this.shoppingCartItemCount += cart.items[productId].quantity;
      }
    });
  }

  logout(){
  	this.auth.logout();
  }

}
