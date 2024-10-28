import { Component, inject } from '@angular/core';
import { UsersService } from '../../services/users/users.service';
import { User } from '../../models/user.model';
import { ProfilesAdminComponent } from '../profiles-admin/profiles-admin/profiles-admin.component';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [ProfilesAdminComponent],
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.scss'
})
export class AdminUsersComponent {

  private userService = inject(UsersService)

  public users: User[] = [];

  ngOnInit():void {
    this.userService.getAllUsers().subscribe(usersData => {
      this.users = usersData as User[];
    })
  }
  

}
