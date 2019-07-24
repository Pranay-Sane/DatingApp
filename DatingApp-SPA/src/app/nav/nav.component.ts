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
  photoUrl: string;

  constructor(
    public authService: AuthService,
    private alertify: AlertifyService,
    private router: Router
  ) {}

  ngOnInit() {
    this.setLoginStatus();
  }

  login() {
    this.authService.login(this.model).subscribe(
      res => {
        this.alertify.success('Logged in successfully');
        this.setLoginStatus();
      },
      err => this.alertify.error(err),
      () => this.router.navigate(['/members'])
    );
  }

  setLoginStatus() {
    // this.loggedIn = this.authService.loggedIn();
    if (this.authService.user) {
      this.loggedIn = true;
      this.username = this.authService.getUsername();
      // this.photoUrl = this.authService.getUser().photoUrl;
      this.authService.currentPhotoUrl.subscribe(
        photoUrl => (this.photoUrl = photoUrl)
      );
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.user = null;
    this.alertify.message('logged out');
    this.setLoginStatus();
    this.router.navigate(['/home']);
  }
}
