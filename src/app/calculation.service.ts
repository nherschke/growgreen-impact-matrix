import { Injectable } from '@angular/core';
import { AppData } from './app.data';

@Injectable({
  providedIn: 'root',
})
export class CalculationService {
  precipitation: number;
  lifespan: number;
  wallSize: number;
  investment: number;

  co2min: number;
  co2max: number;

  retentionMin: number;
  retentionMax: number;

  constructor(private data: AppData) {}

  setInput(
    precipitation: number,
    lifespan: number,
    wallSize: number,
    investment: number
  ) {
    this.precipitation = precipitation;
    this.lifespan = lifespan;
    this.wallSize = wallSize;
    this.investment = investment;
  }

  calculateWithWallSize() {
    this.co2min =
      this.wallSize * this.lifespan * this.data.CO2_SEQUESTRATION_MIN;
    this.co2max =
      this.wallSize * this.lifespan * this.data.CO2_SEQUESTRATION_MAX;

    this.retentionMin = this.data.WATER_RETENTION_MIN * this.precipitation;
    this.retentionMax = this.data.WATER_RETENTION_MAX * this.precipitation;
  }

  calculateWithInvestment() {}
}
