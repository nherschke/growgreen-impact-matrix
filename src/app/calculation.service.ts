import { Injectable } from '@angular/core';
import { AppData } from './app.data';

@Injectable({
  providedIn: 'root',
})
export class CalculationService {
  // General
  precipitation: number;
  lifespan: number;
  wallSize: number;
  investment: number;

  // Input Investment
  wallSizeMin: number;
  wallSizeMax: number;

  // Environmental Tab
  co2min: number;
  co2max: number;
  retentionMin: number;
  retentionMax: number;

  // Economic Tab
  investmentMin: number;
  investmentMax: number;
  maintenance: number;
  disposal: number;
  totalMin: number;
  totalMax: number;

  airQualityMin: number;
  airQualityMax: number;
  smReductionMin: number;
  smReductionMax: number;
  energyReductionMin: number;
  energyReductionMax: number;

  wallLongevity: number;
  propertyValue: number;

  totalCostBenefitsMin: number;
  totalCostBenefitsMax: number;

  constructor(private data: AppData) {}

  setInput(
    precipitation: number,
    lifespan: number,
    wallSize: number,
    investment: number
  ) {
    this.precipitation = +precipitation;
    this.lifespan = +lifespan;
    this.wallSize = +wallSize;
    this.investment = +investment;
  }

  calculateWithWallSize() {
    // Environmental tab
    this.co2min =
      this.wallSize * this.lifespan * this.data.CO2_SEQUESTRATION_MIN;
    this.co2max =
      this.wallSize * this.lifespan * this.data.CO2_SEQUESTRATION_MAX;

    this.calculateRetention();

    this.calculateCosts(this.wallSize);
  }

  calculateWithInvestment() {
    this.wallSizeMin = this.investment / this.data.INVESTMENT_MAX;
    this.wallSizeMax = this.investment / this.data.INVESTMENT_MIN;
    let wallSizeAvg = (this.wallSizeMin + this.wallSizeMax) / 2;

    this.co2min = wallSizeAvg * this.lifespan * this.data.CO2_SEQUESTRATION_MIN;
    this.co2max = wallSizeAvg * this.lifespan * this.data.CO2_SEQUESTRATION_MAX;

    this.calculateRetention();

    this.calculateCosts(wallSizeAvg);
  }

  calculateRetention() {
    this.retentionMin = this.data.WATER_RETENTION_MIN * this.precipitation;
    this.retentionMax = this.data.WATER_RETENTION_MAX * this.precipitation;
  }

  calculateCosts(wallSize: number) {
    // Real Costs
    this.investmentMin = wallSize * this.data.INVESTMENT_MIN;
    this.investmentMax = wallSize * this.data.INVESTMENT_MAX;
    this.maintenance = wallSize * this.data.MAINTENANCE;
    this.disposal = wallSize * this.data.DISPOSAL;
    this.totalMin = this.investmentMin + this.maintenance + this.disposal;
    this.totalMax = this.investmentMax + this.maintenance + this.disposal;

    // Environmental Impact Cost Benefits
    this.airQualityMin =
      wallSize * this.lifespan * this.data.AIR_QUALITY_MONETIZATION_MIN;
    this.airQualityMax =
      wallSize * this.lifespan * this.data.AIR_QUALITY_MONETIZATION_MAX;

    this.smReductionMin =
      wallSize * this.lifespan * this.data.WATER_RETENTION_MONETIZATION_MIN;
    this.smReductionMax =
      wallSize * this.lifespan * this.data.WATER_RETENTION_MONETIZATION_MAX;

    this.energyReductionMin =
      wallSize * this.lifespan * this.data.ENERGY_REDUCTION_MONETIZATION_MIN;
    this.energyReductionMax =
      wallSize * this.lifespan * this.data.ENERGY_REDUCTION_MONETIZATION_MAX;

    // Economic Cost Benefits
    this.wallLongevity =
      this.lifespan >= 35 ? this.data.MEMBRANE_LONGEVITY_MONETIZATION : 0;
    this.propertyValue =
      wallSize * this.lifespan * this.data.PROPERTY_VALUE_MONETIZATION;

    // Total Cost Benefits
    this.totalCostBenefitsMin =
      this.airQualityMin +
      this.smReductionMin +
      this.energyReductionMin +
      this.wallLongevity +
      this.propertyValue;
    this.totalCostBenefitsMax =
      this.airQualityMax +
      this.smReductionMax +
      this.energyReductionMax +
      this.wallLongevity +
      this.propertyValue;
  }
}
