// taken from: https://github.com/skyra-project/star-wars-api/blob/main/src/utils/star-wars.d.ts

export interface SwapiResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T;
}

export interface Film {
  characters: string[];
  director: string;
  episodeId: number;
  openingCrawl: string;
  planets: string[];
  producers: string[];
  releaseDate: string;
  species: string[];
  starships: string[];
  title: string;
  vehicles: string[];
}

export interface Person {
  birthYear: string | null;
  eyeColors: string[] | null;
  films: number[];
  gender: 'male' | 'female' | 'hermaphrodite' | null;
  hairColors: string[] | null;
  height: number | null;
  homeworld: string | null;
  mass: number | null;
  name: string;
  skinColors: string[] | null;
  species: string[];
  starships: string[];
  vehicles: string[];
}

export interface Planet {
  climate: string[] | null;
  diameter: number | null;
  films: number[];
  gravity: number | null;
  name: string;
  orbitalPeriod: string | null;
  population: number | null;
  residents: string[];
  rotationPeriod: string | null;
  surfaceWater: string | null;
  terrains: string[] | null;
}

export interface Species {
  averageHeight: number | null;
  averageLifespan: number | null;
  classification: string | null;
  designation: 'reptilian' | 'sentient';
  eyeColors: string[] | null;
  films: number[];
  hairColors: string[] | null;
  homeworld: string | null;
  language: string | null;
  name: string;
  people: string[];
  skinColors: string[] | null;
}

export interface Starship {
  cargoCapacity: number | null;
  consumables: number | null;
  costInCredits: number | null;
  crew: number | null;
  films: number[];
  hyperdriveRating: number | null;
  length: number;
  manufacturers: string[];
  maxAtmospheringSpeed: number | null;
  MGLT: number | null;
  model: string;
  name: string;
  passengers: number | null;
  pilots: string[];
  starshipClass: string;
}

export interface Vehicle {
  cargoCapacity: number | null;
  consumables: number | null;
  costInCredits: number | null;
  crew: number;
  films: number[];
  length: number | null;
  manufacturers: string[] | null;
  maxAtmospheringSpeed: number | null;
  model: string;
  name: string;
  passengers: number | null;
  pilots: string[];
  vehicleClass: string;
}
