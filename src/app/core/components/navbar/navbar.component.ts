import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'shared/services/auth.service';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { User } from 'shared/models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  appUser:User;
  shoppingCartItemCount:number;
  constructor(private auth: AuthService,private shoppingCartService: ShoppingCartService, private router:Router) {
  	
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
    this.router.navigate(['/']);
  }

}
