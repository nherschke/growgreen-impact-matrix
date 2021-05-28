import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppData {
  public NO2_MIN = 11.7;
  public NO2_MAX = 40;
  public SO2 = 3.5;
  public PM2_5 = 1.34;
  public PM10_MIN = 42;
  public PM10_MAX = 60;
  public O3 = 40;
  public CO = 1.34;
  public CO2_SEQUESTRATION_MIN = 0.14;
  public CO2_SEQUESTRATION_MAX = 0.98;
  public NO3_REDUCTION_MIN = 30;
  public NO3_REDUCTION_MAX = 83;
  public TSS_REDUCTION_MIN = 33;
  public TSS_REDUCTION_MAX = 99;
  public P_REDUCTION_MIN = 15;
  public P_REDUCTION_MAX = 30;
  public ENERGY_REDUCTION_MIN = 10;
  public ENERGY_REDUCTION_MAX = 20;
  public WATER_RETENTION_MIN = 0;
  public WATER_RETENTION_MAX = 75;
  public NOISE_REDUCTION_MIN = 5.5;
  public NOISE_REDUCTION_MAX = 9.8;
  public TEMPERATURE_OUTDOOR_MIN = 1;
  public TEMPERATURE_OUTDOOR_MAX = 4.1;
  public TEMPERATURE_INDOOR = 4.8;
  public INVESTMENT_MIN = 408;
  public INVESTMENT_MAX = 1091;
  public MAINTENANCE = 18.98;
  public DISPOSAL = 239;
  public ENERGY_COST_REDUCTION_MIN = 4;
  public ENERGY_COST_REDUCTION_MAX = 9.4;
  public MEMBRANE_LONGEVITY_COST = 2.68;
  public PROPERTY_VALUE = 4.33;
  public RUNOFF_COST_REDUCTION_MIN = 0;
  public RUNOFF_COST_REDUCTION_MAX = 22.96;
  public AIR_QUALITY_MONETIZATION = 0.63;
}
