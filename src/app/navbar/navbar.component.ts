import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authenticationService : AuthenticationService, private router : Router) { }

  ngOnInit() {
    this.loggedIn = this.authenticationService.isLoggedIn();
  }

  loggedIn: Boolean;

  logout = function () {
    this.authenticationService.logout();
    this.loggedIn = this.authenticationService.isLoggedIn();
    this.router.navigateByUrl("/home");
  }
}
