import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  loggedIn = false;
  username: string;

  constructor(
    private authService: AuthService,
    private alertify: AlertifyService,
    private router: Router
  ) {}

  ngOnInit() {
    this.setLoginStatus();
  }

  login() {
    this.authService
      .login(this.model)
      .subscribe(
        res => {
          this.alertify.success('Logged in successfully');
          this.setLoginStatus();
        },
        err => this.alertify.error(err),
        () => this.router.navigate(['/members'])
      );
  }

  setLoginStatus() {
    this.loggedIn = this.authService.loggedIn();
    if (this.loggedIn) {
      this.username = this.authService.getUsername();
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.alertify.message('logged out');
    this.setLoginStatus();
    this.router.navigate(['/home']);
  }
}
