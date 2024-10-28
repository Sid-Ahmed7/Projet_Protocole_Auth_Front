import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomButtonComponent } from '../../components/custom-button/custom-button.component';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

type signUpForm = {
username:string;
email:string;
password:string;
confirmPassword:string;
};
@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, FormsModule, CustomButtonComponent],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  textButton = 'S\'inscrire';
  constructor(private authService: AuthService, private router: Router) { }

   signUp : signUpForm = {
    username : '',
    email : '',
    password : '',
    confirmPassword : '',
  };

  register() {
    this.authService.register(this.signUp.username, this.signUp.email, this.signUp.password, this.signUp.confirmPassword).subscribe(user => {
        this.router.navigate(['/connexion']);
      });
  }
}
