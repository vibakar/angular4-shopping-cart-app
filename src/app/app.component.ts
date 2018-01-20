import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private auth:AuthService, private router:Router, private route:ActivatedRoute, private userService:UserService){
  	this.auth.user$.subscribe(user=>{
  		if(user){
  			this.userService.save(user);
    		 let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
       		 this.router.navigateByUrl(returnUrl);
  		}
  	})
  }
}
