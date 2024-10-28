export class Game {
  id?: number;
  name?: string;
  cover?: string;
  genre?: string;
  platform?: string[];
  summary?: string;
  artworks?: string;
  screenshots?: string[];
  releaseDate?: string;
  involved_companies?: string[];
  rating?: number;
  year?: number;
  isGameAdded: boolean = false;

  constructor(
    id?: number,
    name?: string,
    cover?: string,
    genre?: string,
    platform: string[] = [],
    year?: number,
    summary?: string,
    artworks?: string,
    screenshots?: string[],
    releaseDate?: string,
    involved_companies?: string[],
    rating?: number,
    isGameAdded: boolean = false
  ) {
    this.id = id;
    this.name = name;
    this.cover = cover;
    this.genre = genre;
    this.platform = platform;
    this.summary = summary;
    this.artworks = artworks;
    this.screenshots = screenshots;
    this.releaseDate = releaseDate;
    this.involved_companies = involved_companies;
    this.rating = rating;
    this.year = year;
    this.isGameAdded = isGameAdded;
  }
}
