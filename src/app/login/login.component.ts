import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {
    email: '',
    password: ''
  };
  errorMessage = '';
  error: {name: string, message: string} = {name: '', message: ''};
  resetPassword = false;
  constructor(private authService: AuthService, private router: Router) {
  }

  clearErrorMessage() {
    this.errorMessage = '';
    this.error = {name: '', message: ''};
  }

   signInWithTwitter() {
      this.authService.signInWithTwitter()
      .then((res) => { 
          this.router.navigate(['dashboard'])
        })
      .catch((err) => console.log(err));
    }


    signInWithFacebook() {
      this.authService.signInWithFacebook()
      .then((res) => {
          this.router.navigate(['dashboard'])
        })
      .catch((err) => console.log(err));
    }


    signInWithGoogle() {
      this.authService.signInWithGoogle()
      .then((res) => {
          this.router.navigate(['dashboard'])
        })
      .catch((err) => console.log(err));
    }

    signInWithGithub() {
      this.authService.signInWithGithub()
      .then((res) => {
          this.router.navigate(['dashboard'])
        })
      .catch((err) => console.log(err));
    }

    signInWithEmail() {

      this.authService.signInRegular(this.user.email, this.user.password)
        .then((res) => {
          console.log(res);
          this.router.navigate(['dashboard']);
        })
        .catch((err) => { 
          alert(err);
          console.log('error: ' + err);
        });
    }

    createUserWithEmail() {
      this.authService.createUserWithEmail(this.user.email, this.user.password)
        .then((res) => {
          alert('New user '+this.user.email+' created successfully');
          console.log(res);
          this.router.navigate(['login']);
        })
        .catch((err) => { 
          alert(err);
          console.log('error: ' + err);
        });
        
    }

    sendResetEmail() {
      this.clearErrorMessage()
   
      this.authService.resetPassword(this.user.email)
        .then(() => this.resetPassword = true)
        .catch(_error => {
          this.error = _error
        })
    }

    redirectToRegistration(){
      this.router.navigate(['./registeruser']);
    }

  ngOnInit() {
  }

}
