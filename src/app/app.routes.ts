import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { CguComponent } from './pages/cgu/cgu.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AproposComponent } from './pages/apropos/apropos.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { GamePageComponent } from './pages/game-page/game-page.component';
import { GameListComponent } from './pages/game-list/game-list.component';
import { ProfileEditComponent } from './pages/profile-edit/profile-edit.component';
import { EditInformationsComponent } from './components/edit-informations/edit-informations.component';
import { EditNotificationsComponent } from './components/edit-notifications/edit-notifications.component';
import { EditSecurityComponent } from './components/edit-security/edit-security.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminCommentsComponent } from './components/admin-comments/admin-comments.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminUsersComponent } from './components/admin-users/admin-users.component';
import { authGuard } from './core/auth.guard';


export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'profil/:slug',
    component: ProfileComponent,
    canActivate: [authGuard]
  },
  {
    path: 'connexion',
    component: LoginComponent ,
  },
  {
    path: 'inscription',
    component: SignUpComponent,
  },
  {
    path:'cgu',
    component: CguComponent,
  },
  {
    path:'contact',
    component: ContactComponent,
  },
 {
    path:'a-propos',
    component: AproposComponent,
  },
  {
    path: 'page-jeu/:name',
    component: GamePageComponent,
  },
  {
    path:'edition',
    component: ProfileEditComponent,
    children: [
      {path:'profil', component: EditInformationsComponent},
      {path:'notifications', component: EditNotificationsComponent},
      {path:'securite', component: EditSecurityComponent},
      {path: '', redirectTo: '/edition/profil', pathMatch: 'full'},
    ],
    canActivate: [authGuard]
  },
  {
    path: 'admin',
    component: AdminComponent,
    children:[
      {path:'admin-tdb', component: AdminDashboardComponent},
      {path:'utilisateurs', component: AdminUsersComponent},
      {path:'commentaires', component: AdminCommentsComponent},
      {path: '', redirectTo: '/admin/admin-tdb', pathMatch: 'full'},
    ]
  },
  {
    path:'jeux',
    component: GameListComponent,
  }
];
