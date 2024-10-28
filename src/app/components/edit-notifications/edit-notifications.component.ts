import { Component } from '@angular/core';
import { CustomButtonComponent } from '../custom-button/custom-button.component';

@Component({
  selector: 'app-edit-notifications',
  standalone: true,
  imports: [CustomButtonComponent],
  templateUrl: './edit-notifications.component.html',
  styleUrl: './edit-notifications.component.scss'
})
export class EditNotificationsComponent {
  textButton: string = "Sauvegarder"
}
