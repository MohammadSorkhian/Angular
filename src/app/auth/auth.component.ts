import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { logging } from 'selenium-webdriver';
import { AuthService } from './auth.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  // styleUrls: ['./auth.component.css']
})


export class AuthComponent implements OnInit {

  isLoginMode: boolean = true;
  loginForm: FormGroup;
  isLoading: boolean = false;
  error: string = null;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(1)]),
    });
  }


  onSwitchmode() {
    this.isLoginMode = !this.isLoginMode;
    console.log(this.isLoginMode)
  }


  onSubmit() {
    this.isLoading = true;
    const email = this.loginForm.controls['email'].value
    const password = this.loginForm.controls['password'].value

    if (this.isLoginMode) {
      this.authService.login(email, password)
        .subscribe(response => {
          console.log(response)
          this.error = null;
          this.router.navigate(['/recipes'])
        }
          , error => {
            this.error = error.error.error['message'];
          }
        )
    } else {
      this.authService.signUp(email, password)
        .subscribe((response) => {
          console.log(response);
          this.error = null;
        }
          , error => {
            this.error = error.error.error['message'];
          }
        )
    }
    setTimeout(() => {
      this.isLoading = false;
    }, 500);
  }

  clearAlert() {
    this.error = null;
  }


}
