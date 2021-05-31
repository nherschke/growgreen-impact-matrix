import { ThrowStmt } from '@angular/compiler';
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

  wallSizeMin: number;
  wallSizeMax: number;

  co2min: number;
  co2max: number;

  retentionMin: number;
  retentionMax: number;

  investmentMin: number;
  investmentMax: number;
  maintenance: number;
  disposal: number;
  totalMin: number;
  totalMax: number;

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

    this.calculateRetention();

    this.investmentMin = this.wallSize * this.data.INVESTMENT_MIN;
    this.investmentMax = this.wallSize * this.data.INVESTMENT_MAX;
    this.maintenance = this.wallSize * this.data.MAINTENANCE;
    this.disposal = this.wallSize * this.data.DISPOSAL;
    this.totalMin = this.investmentMin + this.maintenance + this.disposal;
    this.totalMax = this.investmentMax + this.maintenance + this.disposal;
  }

  calculateWithInvestment() {
    this.wallSizeMin = this.investment / this.data.INVESTMENT_MAX;
    this.wallSizeMax = this.investment / this.data.INVESTMENT_MIN;

    this.co2min =
      ((this.wallSizeMin + this.wallSizeMax) / 2) *
      this.lifespan *
      this.data.CO2_SEQUESTRATION_MIN;
    this.co2max =
      ((this.wallSizeMin + this.wallSizeMax) / 2) *
      this.lifespan *
      this.data.CO2_SEQUESTRATION_MAX;

    this.calculateRetention();
  }

  calculateRetention() {
    this.retentionMin = this.data.WATER_RETENTION_MIN * this.precipitation;
    this.retentionMax = this.data.WATER_RETENTION_MAX * this.precipitation;
  }
}
