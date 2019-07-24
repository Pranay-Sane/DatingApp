import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl + 'auth/';
  jwtHelper = new JwtHelperService();
  photoUrl = new BehaviorSubject<string>('../../assets/user.png');
  currentPhotoUrl = this.photoUrl.asObservable();
  user: User;

  constructor(private http: HttpClient) {}

  changeMemberPhoto(photoUrl: string) {
    this.photoUrl.next(photoUrl);
  }

  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
          const currentUser: User = user.user;
          this.user = currentUser;
          localStorage.setItem('user', JSON.stringify(currentUser));
          this.changeMemberPhoto(currentUser.photoUrl);
        }
      })
    );
  }

  register(user: User) {
    return this.http.post(this.baseUrl + 'register', user);
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  getUsername(): string {
    const token = localStorage.getItem('token');
    return this.jwtHelper.decodeToken(token).unique_name;
  }

  getUserId(): string {
    const token = localStorage.getItem('token');
    return this.jwtHelper.decodeToken(token).nameid;
  }

  getUser(): User {
    const user: User = JSON.parse(localStorage.getItem('user'));
    return user;
  }

  setUserPhoto(photoUrl: string) {
    // const user: User = JSON.parse(localStorage.getItem('user'));
    this.user.photoUrl = photoUrl;
    localStorage.setItem('user', JSON.stringify(this.user));
  }
}
