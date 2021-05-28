import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CalculationService {
  precipitation: number;
  lifespan: number;
  wallSize: number;
  investment: number;

  constructor() {}

  calculateWithWallSize(
    precipitation: number,
    lifespan: number,
    wallSize: number
  ) {
    this.precipitation = precipitation;
    this.lifespan = lifespan;
    this.wallSize = wallSize;
  }

  calculateWithInvestment(
    precipitation: number,
    lifespan: number,
    investment: number
  ) {
    this.precipitation = precipitation;
    this.lifespan = lifespan;
    this.investment = investment;
  }
}
