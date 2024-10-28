import { Component, inject } from '@angular/core';
import {ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HomepageBannerComponent } from '../../components/homepage-banner/homepage-banner.component';
import { Game } from '../../models/game';
import { GameService } from '../../services/gameService/game.service';
import { Character } from '../../models/character';
import { NgFor, NgIf, NgStyle } from '@angular/common';
import { GameRecommendationComponent } from '../../components/game-recommendation/game-recommendation.component';
import { RatingComponent } from '../../components/rating/rating.component';
import { CustomButtonComponent } from '../../components/custom-button/custom-button.component';
import { GameVoteComponent } from '../../components/game-vote/game-vote.component';
import { TokenService } from '../../services/token/token.service';
import { AuthService } from '../../services/auth/auth.service';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { UsersService } from '../../services/users/users.service';




@Component({
  selector: 'app-game-page',
  standalone: true,
  imports: [HomepageBannerComponent, RouterLink, NgFor, NgIf, GameRecommendationComponent, RatingComponent, NgStyle, CustomButtonComponent, GameVoteComponent],
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.scss'
})
export class GamePageComponent {
  
  games: Game[] = [];
  characters?: Character[];
  modalOpen = false;
  modalImage = '';
  defaultArtwork = '../../assets/banners/default_banner.png';
  btnText = 'Terminé ?';
  class = 'game__infos--btn';
  isGameAdded: boolean = false;
  isGameFinished: boolean = false;
  isConnected: boolean = false;
  slug: string |undefined;
  btnform = 'Envoyer';
  errorMessage = '';
  gameDefaultCover = '../../../assets/pictures/default_cover.png'
  scrollAmount = 0;
  
  private gameService = inject(GameService);
  private userService = inject(UsersService);
  private localStorageService = inject(LocalStorageService);
  private authService = inject(AuthService);
  private tokenService = inject(TokenService);
  private route = inject(ActivatedRoute);
  private redirectRoute = inject(Router);
  
  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe(isLoggedIn => {
      this.isConnected = isLoggedIn;
    });
    this.getUserSlug()

    this.route.params.subscribe(params => {
      const name = params['name'];

      this.gameService.getGameByName(name).subscribe({
        next: (data: any[]) => {
          this.games = data.map(gameData => {
            const id = gameData.id;
            const cover_id =  this.gameService.getCoverUrl(gameData.cover?.image_id);
            const name = gameData.name;
            const summary = gameData.summary;
            const genres_name = this.gameService.getGenreNames(gameData.genres?.map((genre: any) => genre.name) || []);
            const platforms_name = gameData.platforms?.map((platform: any) => platform.name) || [];
            const artworks_id = gameData.artworks?.map((artwork: any) => artwork.image_id);
            const screenshots_id = gameData.screenshots?.map((screenshot: any) => screenshot.image_id);
            const involved_companies = gameData.involved_companies?.map((involvedCompany: any) => involvedCompany.company)
              ?.map((company: any) => company.name);
              const date = this.gameService.formatReleaseDate(gameData.first_release_date);
              const isAdded = this.getAddedStatus(id);

              return new Game(id, name, cover_id, genres_name, platforms_name, 0, summary, artworks_id, screenshots_id, date, involved_companies,0, isAdded);
          })
        },
        error: (error) => {
          this.errorMessage = 'Échec du chargement du jeu';

        }
      });
    });
  }

  openModal(image: string) {
    this.modalOpen = true;
    this.modalImage = image;
  }
  closeModal() {
    this.modalOpen = false;
  }



  scrollCarousel(direction: string): void {
    const carousel = document.getElementById('carousel') as HTMLElement ;
    const scrollSpeed = 5;
    const maxScroll = carousel?.scrollWidth - carousel?.clientWidth;
    if (direction === 'right') {
      this.scrollAmount += scrollSpeed;
      if (this.scrollAmount >= maxScroll) this.scrollAmount = maxScroll;
    } else {
      this.scrollAmount -= scrollSpeed;
      if (this.scrollAmount <= 0) this.scrollAmount = 0;
    }

    carousel.scrollLeft = this.scrollAmount;
  }


  onMouseMove(event: MouseEvent): void {
    const carousel = event.target as HTMLElement;
    const rect = carousel.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const width = carousel.offsetWidth;

    if (x < width / 3) {
      this.scrollCarousel('left');
    } else if (x > width * 2 / 3) {
      this.scrollCarousel('right');
    }
  };

  toggleGamePossessed(){
    this.isGameAdded = !this.isGameAdded;
  }
  toggleGame(){
    this.isGameFinished = !this.isGameFinished;
    this.btnText = this.isGameFinished ? 'Terminé !' : 'Terminé ?';
  }

  getAddedStatus(gameId: number): boolean {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem(`game_${gameId}`) === 'true';
    }
    return false;
  }

  getPlatformsForVoting(platforms: string[] = []) :  string[] {
    if (!platforms || platforms.length === 0) {
      return [ 'No platforms found'];
    } else {
      return platforms;
    }
  }



  getPlatformNames(platforms: string[] | undefined): string {
    if (!platforms || platforms.length === 0) {
      return 'No platforms found';
    } else if (platforms.length === 1) {
      return platforms[0];
    } else {
      return platforms.join(', ');
    }
  }

  getArtworkUrls(game: Game): string {
    if (!game.artworks) {
      return this.defaultArtwork;
    }
    if (game.artworks && game.artworks.length > 0) {
      return `https://images.igdb.com/igdb/image/upload/t_screenshot_med_2x/${game.artworks[0]}.jpg`;
    }
    else {
      return `https://images.igdb.com/igdb/image/upload/t_screenshot_med_2x/${game.artworks}.jpg`;
    }
  }

  getScreenshotUrls(game: Game): string[] {
    return game.screenshots?.map(screenshotId => `https://images.igdb.com/igdb/image/upload/t_screenshot_big/${screenshotId}.jpg`) || [];
  }

 
  getUserSlug() {
    this.slug = this.tokenService.getSlugInToken(); 
    if (this.slug) {
      this.userService.getOneBySlug(this.slug).subscribe(
        userData => {
          this.slug = userData.slug; 
        },
        error => {
          this.errorMessage = "Erreur lors de la récupération du slug de l'utilisateur.";    
        }
      );
    }
  }

  addGameToUserList(game: Game) {
    const storedToken = localStorage.getItem('token');
    if (storedToken != null) {
      this.gameService.addGameToList(storedToken, game.id).subscribe(
        data => {
          localStorage.setItem(`game_${game.id}`, 'true');
          game.isGameAdded = true;
          alert(`${game.name} ajouté à votre liste`);
          this.redirectRoute.navigate(['/profil', this.slug]);
},
        error => {
          if (error.status === 500) {
            this.redirectRoute.navigate(["/connexion"]);
          }
        }
      );
    }
  }

  deleteGameToUserList(game:Game) {
    const storedToken = this.tokenService.getToken();
    if (storedToken != null) {
      if(game.id) {
        this.gameService.deleteGameInList(storedToken, game.id).subscribe(data => {
          localStorage.setItem(`game_${game.id}`, 'false');
          game.isGameAdded = false;
          alert(`${game.name} à été supprimé  à votre liste`)
        },
        error => {
          if (error.status === 500) {
            this.redirectRoute.navigate(['/profil', this.slug]);
          }
        }
      );
      }
    
    }
  }
}
