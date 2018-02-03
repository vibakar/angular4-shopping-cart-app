import { Component } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from 'shared/services/user.service';

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
    		 let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
       	 if(returnUrl) this.router.navigateByUrl(returnUrl);
         else if(window.location.pathname === '/login') this.router.navigateByUrl('/');
  		}
  	})
  }
}
