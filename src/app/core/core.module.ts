import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: 'login',
      component: LoginComponent
    }])
  ],
  declarations: [
    NavbarComponent,
    HomeComponent,
    LoginComponent
  ],
  exports: [
    NavbarComponent
  ]
})
export class CoreModule { }
