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

  airQualityCB: number;
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

    this.airQualityCB =
      this.wallSize * this.lifespan * this.data.AIR_QUALITY_MONETIZATION;

    this.smReductionMin =
      this.wallSize * this.lifespan * this.data.RUNOFF_COST_REDUCTION_MIN;
    this.smReductionMax =
      this.wallSize * this.lifespan * this.data.RUNOFF_COST_REDUCTION_MAX;

    this.energyReductionMin =
      this.wallSize * this.lifespan * this.data.ENERGY_COST_REDUCTION_MIN;
    this.energyReductionMax =
      this.wallSize * this.lifespan * this.data.ENERGY_COST_REDUCTION_MAX;

    this.wallLongevity =
      this.wallSize * this.lifespan * this.data.MEMBRANE_LONGEVITY_COST;
    this.propertyValue =
      this.wallSize * this.lifespan * this.data.PROPERTY_VALUE;

    this.totalCostBenefitsMin =
      this.airQualityCB +
      this.smReductionMin +
      this.energyReductionMin +
      this.wallLongevity +
      this.propertyValue;
    this.totalCostBenefitsMax =
      this.airQualityCB +
      this.smReductionMax +
      this.energyReductionMax +
      this.wallLongevity +
      this.propertyValue;
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
