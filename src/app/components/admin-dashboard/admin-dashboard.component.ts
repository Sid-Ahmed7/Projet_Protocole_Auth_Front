import { Component } from '@angular/core';
import { AdminUsersComponent } from '../admin-users/admin-users.component';
import { AdminCommentsComponent } from '../admin-comments/admin-comments.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [AdminCommentsComponent, AdminUsersComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {

}
