import { Component, effect, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { EditInformationsComponent } from '../../components/edit-informations/edit-informations.component';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { TokenService } from '../../services/token/token.service';


@Component({
  selector: 'app-profile-edit',
  standalone: true,
  imports: [RouterLink, RouterOutlet, RouterLinkActive, EditInformationsComponent],
  templateUrl: './profile-edit.component.html',
  styleUrl: './profile-edit.component.scss'
})
export class ProfileEditComponent {

  private localStorageService = inject(LocalStorageService)
  private tokenService = inject(TokenService)
  slug?:string|null;

  ngOnInit():void {
    this.slug = this.tokenService.getSlugInToken();
    this.localStorageService.watchStorage().subscribe((data: string) => {
      this.slug = data
    })
    
  }

}
