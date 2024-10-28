import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CustomButtonComponent } from '../../components/custom-button/custom-button.component';
import { AuthService } from '../../services/auth/auth.service';

type loginForm = {
  email : string;
  password:string;
}
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, CustomButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
btnText = 'Connexion';

newUser: loginForm = {
  email: "",
  password: "",
}
constructor(private authService: AuthService, private router: Router) { }


login() :void {
  this.authService.login(this.newUser.email, this.newUser.password).subscribe(user => {
      this.router.navigate(['/home']);
    
  });
}
}

