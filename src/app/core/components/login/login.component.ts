import { Component, OnInit } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

import { AuthService } from 'shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private auth:AuthService, private spinnerService: Ng4LoadingSpinnerService) { }

  gmailLogin(){
  	this.spinnerService.show();
  	this.auth.gmailLogin();
  }

  fbLogin(){
  	this.spinnerService.show();
  	this.auth.fbLogin();
  }
}
