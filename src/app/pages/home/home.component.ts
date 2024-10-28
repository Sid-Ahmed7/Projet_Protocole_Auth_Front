import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { HomepageBannerComponent } from '../../components/homepage-banner/homepage-banner.component';

import { GlobalRecommendationComponent } from '../../components/globalRecommendation/global-recommendation/global-recommendation.component';
import { LastGameHomeComponent } from '../../components/last-game-home/last-game-home.component';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, HomepageBannerComponent, GlobalRecommendationComponent, LastGameHomeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  isConnected = false;
  constructor(private authService: AuthService) {}
  ngOnInit() {
 this.authService.isLoggedIn().subscribe(isLoggedIn => {
      this.isConnected = isLoggedIn;
    });
 }


}
