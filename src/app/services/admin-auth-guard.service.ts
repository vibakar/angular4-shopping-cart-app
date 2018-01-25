import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AdminAuthGuardService implements CanActivate{

  constructor(private auth:AuthService, private userService: UserService, private router:Router) { }

  canActivate(): Observable<boolean>{
  	return this.auth.appUser$
  	.map(user=> {
  		if(user.isAdmin){
  			return true;
  		} else {
  			this.router.navigate(['/']);
  			return false;
  		}
  	});
  }

}
