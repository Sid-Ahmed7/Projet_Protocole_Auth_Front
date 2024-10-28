import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { CardGameSmallComponent } from '../cardGameSmall/card-game-small/card-game-small.component';
import { FilterComponent } from '../filter/filter.component';
import { GameService } from '../../services/gameService/game.service';
import { Game } from '../../models/game';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-tab-nav',
  standalone: true,
  imports: [CommonModule, FilterComponent, CardGameSmallComponent, RouterLink],
  templateUrl: './tab-nav.component.html',
  styleUrl: './tab-nav.component.scss'
})
export class TabNavComponent implements OnInit {
  userGameId: number[] = [];
  games: Game[] = [];
  errorMessage: string = ''; 
  currentSection: string = 'liste-des-jeux';
  private gameService = inject(GameService);


  ngOnInit(): void {
    this.getGames();
  }

  showSection(section: string) {
    this.currentSection = section;
  }

  getGames(): void {
    this.gameService.getListGames()?.subscribe(
      (data) => {
        data.map((dataId) => {
          if (dataId) { this.userGameId.push(dataId.id); }
        });
        this.userGameId.map((id) => {
          this.getGamesById(id);
        });
      },
      (error: HttpErrorResponse) => {
        this.errorMessage = 'Erreur lors du chargement des jeux de l\'utilisateur.'; 
      }
    );
  }


  getGamesById(id: number) {
    this.gameService.getGameById(id).subscribe({
      next: (data: any[]) => {
        data.forEach((gameData) => {
          const id = gameData.id;
          const name = gameData.name;
          const cover_id =  this.gameService.getCoverUrl(gameData.cover?.image_id);
          const summary = gameData.summary;
          const genres_name = this.gameService.getGenreNames(gameData.genres?.map((genre: any) => genre.name) || []);
          const platforms_name = gameData.platforms?.map((platform: any) => platform.name) || [];
          const artworks_id = gameData.artworks?.map((artwork: any) => artwork.image_id);
          const screenshots_id = gameData.screenshots?.map((screenshot: any) => screenshot.image_id);
          const involved_companies = gameData.involved_companies?.map((involvedCompany: any) => involvedCompany.company)
            ?.map((company: any) => company.name);
          const date = this.gameService.formatReleaseDate(gameData.first_release_date);
          const year = this.gameService.getYear(gameData.first_release_date);
          this.games.push(new Game(id, name,cover_id, genres_name, platforms_name, year, summary, artworks_id, screenshots_id, date, involved_companies));
        });
      },
      error: (error) => {
        this.errorMessage = `Erreur lors du chargement du jeu avec l'ID ${id}.`; 
      }
    });
  }







}

