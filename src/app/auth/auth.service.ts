import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from './user.model';

interface responseDataSignupLogin {
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?: boolean,
}


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  user = new BehaviorSubject<User>(null);
  private timeoutRef:any;

  signUp(email: string, password: string) {
    return this.http.post<responseDataSignupLogin>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + environment.firebaseAPIKey
      , {
        email: email,
        password: password,
        returnSecureToken: true
      }
    )
      .pipe(tap(response =>
        this.handleAuthentication(
          response.email,
          response.localId,
          response.idToken,
          +response.expiresIn)
      ))
  }


  login(email: string, password: string) {
    return this.http.post<responseDataSignupLogin>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey
      , {
        email: email,
        password: password,
        returnSecureToken: true
      }
    )
      .pipe(tap(response => {
        this.handleAuthentication(
          response.email,
          response.localId,
          response.idToken,
          +response.expiresIn)
      }
      ))
  }

  handleAuthentication(email: string, id: string, token: string, expIn: number) {
    const expirationDate = new Date(new Date().getTime() + expIn * 1000);
    const user = new User(email, id, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expIn*1000);
    localStorage.setItem("user", JSON.stringify(user))
  }

  autoLogin() {
    const storedUser: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string,
    } = JSON.parse(localStorage.getItem('user'))

    if (!storedUser) {
      return;
    }

      const loadedUser = new User(
        storedUser.email, 
        storedUser.id,
        storedUser._token,
        new Date(storedUser._tokenExpirationDate),)
        console.log('\n' + new Date(new Date().getTime()) + '\n')
        console.log('\n' + new Date(storedUser._tokenExpirationDate) + '\n')
        console.log('\n' + new Date(storedUser._tokenExpirationDate).getTime() + '\n')

    if(loadedUser.token){
      this.user.next(loadedUser);
      let remainingTimeForToken = new Date(storedUser._tokenExpirationDate).getTime() - new Date().getTime()
      this.autoLogout(remainingTimeForToken)
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth'])
    localStorage.removeItem('user');
    if(this.timeoutRef){
      clearTimeout(this.timeoutRef)
    }
  }

  autoLogout(expirationDuration: number){
    this.timeoutRef = setTimeout(() => {
      this.logout()
    }, expirationDuration);
  }
}
