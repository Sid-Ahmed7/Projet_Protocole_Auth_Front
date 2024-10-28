import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomButtonComponent } from '../custom-button/custom-button.component';
import { UsersService } from '../../services/users/users.service';
import { User } from '../../models/user.model';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { UpdateUser } from '../../models/updateUser/update-user.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenService } from '../../services/token/token.service';

type updateForm = {
  username:string;
  email:string;
  biography:string,
  password:string;
  confirmPassword:string;
};

@Component({
  selector: 'app-edit-informations',
  standalone: true,
  imports: [CommonModule, FormsModule, CustomButtonComponent],
  templateUrl: './edit-informations.component.html',
  styleUrl: './edit-informations.component.scss'
})
export class EditInformationsComponent {

  private userService = inject(UsersService);
  private localStorage = inject(LocalStorageService);
  private tokenService = inject(TokenService)
  private router: Router = inject(Router);

  public userData?: User;

  textButton: string = 'Sauvegarder';

  slug?:string|null;

  updateUser : updateForm = {
    username : '',
    email : '',
    biography: '',
    password : '',
    confirmPassword : '',
  };

  messageOnUpdate: string = '';

  bannerUrl: string = '';
  profilePictureUrl: string = '';

  onUploadBanner(id: number):void {
    if (this.userData) {
      id = this.userData.id as number;
      this.userData.bannerPicture = this.bannerUrl
      this.userService.updateImage(id, this.userData, "banner").subscribe(data => {
        this.bannerUrl = data.bannerPicture
    })
    }
  }

  onUploadProfile(id: number):void {
    if(this.userData) { 
      id = this.userData.id as number;
      this.userData.profilePicture = this.profilePictureUrl
      this.userService.updateImage(id, this.userData, "profile").subscribe(data => {
      this.profilePictureUrl = data.profilePicture
    })
    }
  }

  onSubmitForm(id: number) {
    const updateUser: UpdateUser = new UpdateUser(this.updateUser.username, this.updateUser.email, this.updateUser.biography, this.updateUser.password)
    this.userService.updateUser(id, updateUser).subscribe(data => {
      this.userData = data;
      this.localStorage.setValue('slug', this.userData?.slug as string);
      this.updateUser.password = '';
      this.updateUser.confirmPassword = '';
      this.messageOnUpdate = "Votre profil a bien été mis à jour"
    })
  }

  ngOnInit():void {
    this.slug = this.tokenService.getSlugInToken();
    this.userService.getOneBySlug(this.slug!).subscribe(data => {
      this.userData = data as User;
      this.updateUser.username = this.userData.username;
      this.updateUser.email = this.userData.email;
      this.updateUser.biography = this.userData.biography;
      this.bannerUrl = this.userData.bannerPicture !== null ? this.userData.bannerPicture : '';
      this.profilePictureUrl = this.userData.profilePicture;
    }, 
     (error: HttpErrorResponse) => {
       alert("Nous rencontrons un souci technique, veuillez réessayer dans quelques minutes")
       this.router.navigate(["./home"])
   }
  )
  }
}
