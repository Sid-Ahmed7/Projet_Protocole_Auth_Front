import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-homepage-banner',
  standalone: true,
  imports: [],
  templateUrl: './homepage-banner.component.html',
  styleUrl: './homepage-banner.component.scss'
})
export class HomepageBannerComponent {
  @Input() gameBannerUrl: string | undefined;
  defaultBannerUrl: string = '../../assets/banners/hades_banner.jpg';

  constructor() {
    this.gameBannerUrl = this.defaultBannerUrl;
  }
}
