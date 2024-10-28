import { Component, Input, inject } from '@angular/core';
import { UsersService } from '../../../services/users/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profiles-admin',
  standalone: true,
  imports: [],
  templateUrl: './profiles-admin.component.html',
  styleUrl: './profiles-admin.component.scss'
})
export class ProfilesAdminComponent {

  @Input() id: number = 0;
  @Input() username: string = "";
  @Input() email: string = "";

  private userService = inject(UsersService)
  private router:Router = inject(Router)

  deleteUser(): void {
    this.userService.deleteUser(this.id).subscribe(data => {
      this.router.navigate(["./admin/utilisateurs"])
    })
  }

}
