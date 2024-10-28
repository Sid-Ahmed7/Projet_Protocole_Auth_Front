import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card-game-small',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './card-game-small.component.html',
  styleUrl: './card-game-small.component.scss'
})
export class CardGameSmallComponent {
  @Input() gameName?: string = 'Jeu Non Trouvé';
  @Input() gameCover?: string = './assets/pictures/default_cover.png';
  @Input() gameGenre?: string = 'Genre';
  @Input() release?: string = 'Date de sortie'; 
}
