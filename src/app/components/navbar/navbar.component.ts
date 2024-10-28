import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router,RouterLink } from '@angular/router';
import { TokenService } from '../../services/token/token.service';
import { AuthService } from '../../services/auth/auth.service';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  private tokenService = inject(TokenService)
  slug?:string|null;
  

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  
  isConnected: boolean = false;
  isAdmin: boolean =true;
  
 ngOnInit() {
   this.authService.isLoggedIn().subscribe((isLoggeIn) =>{
    this.isConnected = isLoggeIn;
    
    this.slug = this.tokenService.getSlugInToken();
  });
}
  closeMenu() {
    const menuToggle = document.getElementById('menu-toggle') as HTMLInputElement;
    if (menuToggle) {
      menuToggle.checked = false;
    }
  }
logout() {
  this.authService.logout();
  this.isConnected = false;
  this.router.navigate(['/connexion'])
}
}
