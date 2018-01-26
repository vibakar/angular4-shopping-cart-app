import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  appUser:User;
  constructor(private auth: AuthService) {
  	auth.appUser$.subscribe(user=>this.appUser = user)
  }

  logout(){
  	this.auth.logout();
  }

}
