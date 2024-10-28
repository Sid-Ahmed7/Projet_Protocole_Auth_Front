import { Component } from '@angular/core';
import { CustomButtonComponent } from '../custom-button/custom-button.component';

@Component({
  selector: 'app-edit-security',
  standalone: true,
  imports: [CustomButtonComponent],
  templateUrl: './edit-security.component.html',
  styleUrl: './edit-security.component.scss'
})
export class EditSecurityComponent {
  textButton:string = "Sauvegarder";
}
