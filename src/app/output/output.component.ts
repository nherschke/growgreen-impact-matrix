import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppData } from '../app.data';
import { CalculationService } from '../calculation.service';
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import { FormBuilder, FormGroup } from '@angular/forms';

interface Row {
  year: number;
  savedCostsWorst: number;
  savedCostsBest: number;
  realCostsWorst: number;
  realCostsBest: number;
  discountFactor: number;
  dcCashflowWorst: number;
  dcCashflowBest: number;
  npvWorst: number;
  npvBest: number;
  dcSavedCostsWorst: number;
  dcSavedCostsBest: number;
  dcRealCostsWorst: number;
  dcRealCostsBest: number;
  cumDcCashflowWorst: number;
  cumDcCashflowBest: number;
  cumNPVWorst: number;
  cumNPVBest: number;
}

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.css'],
})
export class OutputComponent implements OnInit {
  faQuestionCircle = faQuestionCircle;
  method: string;
  precipitation: number;
  lifespan: number;
  wallSize: number;
  investment: number;

  discountButtonsForm: FormGroup;

  rows: Row[] = [];

  cbNpvWorst: number = 0;
  cbNpvBest: number = 0;
  roiRatioWorst: number = 0;
  roiRatioBest: number = 0;
  roiRatioUndcWorst: number = 0;
  roiRatioUndcBest: number = 0;

  constructor(
    private route: ActivatedRoute,
    private data: AppData,
    private calculationService: CalculationService,
    private formBuilder: FormBuilder
  ) {
    this.precipitation = calculationService.precipitation;
    this.lifespan = calculationService.lifespan;
    this.wallSize = calculationService.wallSize;
    this.investment = calculationService.investment;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.method = params['method'];
    });

    if (this.method === 'wall-size') {
      this.calculationService.calculateWithWallSize();
    }
    if (this.method === 'investment') {
      this.calculationService.calculateWithInvestment();
    }

    this.discountButtonsForm = this.formBuilder.group({
      discountRate: null,
    });

    this.discountButtonsForm
      .get('discountRate')
      .valueChanges.subscribe((value) => {
        this.rows = [];
        this.cbNpvWorst = 0;
        this.cbNpvBest = 0;

        let discountRate: number = +value / 100;
        let year: number;
        let scw: number;
        let scb: number;
        let rcW: number;
        let rcB: number;
        let dcf: number;
        let dcCfW: number;
        let dcCfB: number;
        let npvW: number;
        let npvB: number;
        let dcScW: number;
        let dcScB: number;
        let dcRcW: number;
        let dcRcB: number;
        let cDcCfW: number = 0;
        let cDcCfB: number = 0;
        let cNpvW: number = 0;
        let cNpvB: number = 0;

        // Fill the table
        for (let i = 0; i <= this.lifespan; i++) {
          year = i;

          // Saved Costs
          if (year === 0) {
            scw = 0;
            scb = 0;
          } else if (this.lifespan === 50 && year === 50) {
            scw =
              this.data.TOTAL_BENEFITS_MIN +
              this.data.MEMBRANE_LONGEVITY_MONETIZATION / year;
            year;
            scb =
              this.data.TOTAL_BENEFITS_MAX +
              this.data.MEMBRANE_LONGEVITY_MONETIZATION / year;
          } else {
            scw = this.data.TOTAL_BENEFITS_MIN / year;
            scb = this.data.TOTAL_BENEFITS_MAX / year;
          }

          // Real Costs
          if (year === 0) {
            rcW = this.data.INVESTMENT_MIN;
            rcB = this.data.INVESTMENT_MAX;
          } else if (year === this.lifespan) {
            rcW = this.data.MAINTENANCE / this.lifespan + this.data.DISPOSAL;
            rcB = this.data.MAINTENANCE / this.lifespan + this.data.DISPOSAL;
          } else {
            rcW = this.data.MAINTENANCE;
            rcB = this.data.MAINTENANCE;
          }

          // Discount Factor
          dcf = 1 / (1 + discountRate) ** year;

          // Discounted Cashflow
          dcCfW = (scw - rcW) * dcf;
          dcCfB = (scb - rcB) * dcf;

          // NPV
          npvW = dcCfW / (1 + discountRate) ** year;
          npvB = dcCfB / (1 + discountRate) ** year;

          // Discounted Saved Costs
          dcScW = scw * dcf;
          dcScB = scb * dcf;

          // Discounted Real Costs
          dcRcW = rcW * dcf;
          dcRcB = rcB * dcf;

          // Cumulative Discounted Cashflow
          cDcCfW += dcCfW;
          cDcCfB += dcCfB;

          // Cumulative NPV
          cNpvW += npvW;
          cNpvB += npvB;

          // Cost-Benefit Analysis
          this.cbNpvWorst += npvW;
          this.cbNpvBest += npvB;

          this.rows.push({
            year: year,
            savedCostsWorst: scw,
            savedCostsBest: scb,
            realCostsWorst: rcW,
            realCostsBest: rcB,
            discountFactor: dcf,
            dcCashflowWorst: dcCfW,
            dcCashflowBest: dcCfB,
            npvWorst: npvW,
            npvBest: npvB,
            dcSavedCostsWorst: dcScW,
            dcSavedCostsBest: dcScB,
            dcRealCostsWorst: dcRcW,
            dcRealCostsBest: dcRcB,
            cumDcCashflowWorst: cDcCfW,
            cumDcCashflowBest: cDcCfB,
            cumNPVWorst: cNpvW,
            cumNPVBest: cNpvB,
          });
        }
        console.log(dcf);

        this.roiRatioWorst = dcf / this.data.INVESTMENT_MAX;
        this.roiRatioBest = dcf / this.data.INVESTMENT_MIN;
      });
  }

  active = 1;
}
