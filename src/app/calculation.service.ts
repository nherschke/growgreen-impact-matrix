import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CalculationService {
  constructor() {}

  calculateWithWallSize(
    precipitation: number,
    lifespan: number,
    wallSize: number
  ) {}

  calculateWithInvestment(
    precipitation: number,
    lifespan: number,
    investment: number
  ) {}
}
