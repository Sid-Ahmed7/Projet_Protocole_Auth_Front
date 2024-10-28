import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CustomButtonComponent } from '../custom-button/custom-button.component';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-profile-header',
  standalone: true,
  imports: [CommonModule, CustomButtonComponent, RouterLink],
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.scss'
})
export class ProfileHeaderComponent {
   @Input() bannerUrl : string = '';
   @Input() profilPictureUrl : string = '';
   @Input() username : string = '';
   @Input() isOnline : boolean = false;
   @Input() bio : string = '';
   @Input() slug: string = '';
}
