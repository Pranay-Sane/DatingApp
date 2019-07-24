import { Component, OnInit } from '@angular/core';
import { AuthService } from './_services/auth.service';
import { User } from './_models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const user: User = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.authService.user = user;
      this.authService.changeMemberPhoto(user.photoUrl);
    }
  }
}
