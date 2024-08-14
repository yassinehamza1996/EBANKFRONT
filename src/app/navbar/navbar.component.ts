import { Component } from '@angular/core';
import { AuthService } from '../services/security/auth/auth.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  title = 'admin-bank-ui';
  showNavbar:boolean = true;

  constructor(private authService: AuthService, private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showNavbar = !event.url.includes('/login');
       // this.showNavbar = !event.url.includes('/forbidden');
      }
    });
  }

  ngOnInit(): void {

  }

  logout():void {
    this.authService.logout();
  }
}
