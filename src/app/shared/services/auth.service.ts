import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth'
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './user.service';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import { User } from 'shared/models/user';

@Injectable()
export class AuthService {
  user$:Observable<firebase.User>;
  constructor(private afAuth:AngularFireAuth, private route:ActivatedRoute, private router: Router, private userService:UserService) {
  	this.user$ = this.afAuth.authState;
  }

  gmailLogin(){
  	this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  fbLogin(){
    this.afAuth.auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider());
  }

  logout(){
  	this.afAuth.auth.signOut();
  }

  get appUser$(): Observable<User>{
    return this.user$.switchMap(user=>{
      if(user){
        return this.userService.get(user.uid);
      } else {
        return Observable.of(null);
      }
    })
  }
}
