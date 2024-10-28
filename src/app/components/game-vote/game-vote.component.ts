import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-game-vote',
  standalone: true,
  imports: [NgFor, NgIf, CommonModule],
  templateUrl: './game-vote.component.html',
  styleUrl: './game-vote.component.scss'
})
export class GameVoteComponent {
  @Input() 
  title : string = '';
  @Input() items: string [] = [];

  hasVoted: boolean = !false;
  votedItem: string | null = null;

  constructor() { }
  
  ngOnInit(): void {

  }

  vote(item: string): void {
    if (this.votedItem === item) {
      this.votedItem = null;
    } else {
      this.votedItem = item;
    }
  }

  getItemImagePath(item: string): string {
    const itemImageMap: { [key: string]: string } = {
      'PS5': '../../../assets/pictures/ps-logo.png',
      'PS4': '../../../assets/pictures/ps-logo.png',
      'PS3': '../../../assets/pictures/ps-logo.png',
      'PS2': '../../../assets/pictures/ps-logo.png',
      'Xbox': '../../../assets/pictures/xbox-logo.png',
      'Xbox One': '../../../assets/pictures/xbox-logo.png',
      'Xbox 360': '../../../assets/pictures/xbox-logo.png',
      'Xbox Series X': '../../../assets/pictures/xbox-logo.png',
      'Xbox Series S': '../../../assets/pictures/xbox-logo.png',
      'PC': '../../../assets/pictures/pc-logo.png',
      'Windows': '../../../assets/pictures/pc-logo.png',
      'Nintendo Switch': '../../../assets/pictures/pc-logo.png',
      'Nintendo Wii': '../../../assets/pictures/pc-logo.png',
      'Nintendo Wii U': '../../../assets/pictures/pc-logo.png',
      'Nintendo 3DS': '../../../assets/pictures/pc-logo.png',
      'Nintendo DS': '../../../assets/pictures/pc-logo.png',
    }
    return itemImageMap[item]|| 'assets/pictures/pc-logo.png'
  }


  
}
