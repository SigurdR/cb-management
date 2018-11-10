import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  authState: any = null;
  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;

  constructor(private _firebaseAuth: AngularFireAuth, private router: Router) {
      this.user = _firebaseAuth.authState;

      this.user.subscribe(
        (user) => {
          if (user) {
            this.userDetails = user;
            console.log(this.userDetails);
          } else {
            this.userDetails = null;
          }
        }
      );
  }

  signInWithTwitter() {
    return this._firebaseAuth.auth.signInWithPopup(
      new firebase.auth.TwitterAuthProvider()
    )
  }

  signInWithFacebook() {
    return this._firebaseAuth.auth.signInWithPopup(
      new firebase.auth.FacebookAuthProvider()
    )
  }

  signInWithGoogle() {
    return this._firebaseAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    )
  }

  signInWithGithub() {
    return this._firebaseAuth.auth.signInWithPopup(
      new firebase.auth.GithubAuthProvider()
    )
  }

  signInRegular(email, password) {
    const credential = firebase.auth.EmailAuthProvider.credential( email, password );

    //return this._firebaseAuth.auth.createUserWithEmailAndPassword(email, password)
    return this._firebaseAuth.auth.signInWithEmailAndPassword(email, password)
  }

  createUserWithEmail(email, password) {

    const credential = firebase.auth.EmailAuthProvider.credential( email, password );

    return this._firebaseAuth.auth.createUserWithEmailAndPassword(email, password)

  }
  get isUserAnonymousLoggedIn(): boolean {
    return (this.userDetails !== null) ? this.userDetails.isAnonymous : false
  }
 
  get currentUserId(): string {
    return (this.userDetails !== null) ? this.userDetails.uid : ''
  }
 
  get currentUserName(): string {
    return this.userDetails['email']
  }
 
  get currentUser(): any {
    return (this.userDetails !== null) ? this.userDetails : null;
  }
  isLoggedIn() {
  if (this.userDetails == null ) {
      return false;
    } else {
      return true;
    }
  }

  logout() {
    this._firebaseAuth.auth.signOut()
    .then((res) => this.router.navigate(['/']));
  }

  resetPassword(email: string) {
    return this._firebaseAuth.auth.sendPasswordResetEmail(email)
      .then(() => {
        alert('Check your email to reset password!');
        console.log('sent Password Reset Email!')
      })
      .catch((error) => {
        alert(error);
        console.log(error)
      })
  }
}
