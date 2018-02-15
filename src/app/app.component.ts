import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

import { UserService } from 'shared/services/user.service';
import { AuthService } from 'shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private auth:AuthService, private router:Router, private route:ActivatedRoute, private userService:UserService, private spinnerService: Ng4LoadingSpinnerService){
    this.spinnerService.show();
    this.auth.user$.subscribe(user=>{
      this.spinnerService.hide();
  		if(user){
  			this.userService.save(user);
    		 let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
       	 if(returnUrl) this.router.navigateByUrl(returnUrl);
         else if(window.location.pathname === '/login') this.router.navigateByUrl('/');
  		}
  	})
  }
}
