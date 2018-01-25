import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { User } from '../models/user';

@Injectable()
export class UserService {

  constructor(private afdb:AngularFireDatabase) {}

  save(user: firebase.User){
  	this.afdb.object('/users/'+ user.uid).update({
  		name: user.displayName,
  		email: user.email
  	});
  }
  
  get(uid:string):FirebaseObjectObservable<User>{
  	return this.afdb.object('users/'+uid);
  }
}
