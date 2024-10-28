import { Component } from '@angular/core';
import { GameDisplayComponent } from "../../components/game-display/game-display.component";
import { PaginationComponent } from "../../components/pagination/pagination.component";

@Component({
    selector: 'app-game-list',
    standalone: true,
    templateUrl: './game-list.component.html',
    styleUrl: './game-list.component.scss',
    imports: [GameDisplayComponent, PaginationComponent]
})
export class GameListComponent {

}
