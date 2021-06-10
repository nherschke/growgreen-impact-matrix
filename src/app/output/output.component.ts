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

  totalSCW: number = 0;
  totalSCB: number = 0;
  totalRCW: number = 0;
  totalRCB: number = 0;
  totalDcCfW: number = 0;
  totalDcCfB: number = 0;
  totalNPVW: number = 0;
  totalNPVB: number = 0;
  totalDcSCW: number = 0;
  totalDcSCB: number = 0;
  totalDcRCW: number = 0;
  totalDcRCB: number = 0;

  cbNpvWorst: number = 0;
  cbNpvBest: number = 0;
  roiRatioWorst: number = 0;
  roiRatioBest: number = 0;
  roiRatioUndcWorst: number = 0;
  roiRatioUndcBest: number = 0;
  bcRatioWorst: number = 0;
  bcRatioBest: number = 0;
  bcRatioUndcWorst: number = 0;
  bcRatioUndcBest: number = 0;

  constructor(
    private route: ActivatedRoute,
    private data: AppData,
    private calculationService: CalculationService,
    private formBuilder: FormBuilder
  ) {
    this.precipitation = +calculationService.precipitation;
    this.lifespan = +calculationService.lifespan;
    this.wallSize = +calculationService.wallSize;
    this.investment = +calculationService.investment;
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

        this.bcRatioWorst = 0;
        this.bcRatioBest = 0;

        this.totalSCW = 0;
        this.totalSCB = 0;
        this.totalRCW = 0;
        this.totalRCB = 0;
        this.totalDcCfW = 0;
        this.totalDcCfB = 0;
        this.totalNPVW = 0;
        this.totalNPVB = 0;
        this.totalDcSCW = 0;
        this.totalDcSCB = 0;
        this.totalDcRCW = 0;
        this.totalDcRCB = 0;

        let discountRate: number = +value / 100;
        let year: number;
        let scW: number;
        let scB: number;
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
            scW = 0;
            scB = 0;
          } else if (year === 50) {
            scW =
              this.data.TOTAL_BENEFITS_MIN +
              this.data.MEMBRANE_LONGEVITY_MONETIZATION / this.lifespan;
            year;
            scB =
              this.data.TOTAL_BENEFITS_MAX +
              this.data.MEMBRANE_LONGEVITY_MONETIZATION / this.lifespan;
          } else {
            scW = this.data.TOTAL_BENEFITS_MIN / this.lifespan;
            scB = this.data.TOTAL_BENEFITS_MAX / this.lifespan;
          }

          // Real Costs
          if (year === 0) {
            rcW = this.data.INVESTMENT_MIN;
            rcB = this.data.INVESTMENT_MAX;
          } else if (year === this.lifespan) {
            rcW = this.data.MAINTENANCE + this.data.DISPOSAL;
            rcB = this.data.MAINTENANCE + this.data.DISPOSAL;
          } else {
            rcW = this.data.MAINTENANCE;
            rcB = this.data.MAINTENANCE;
          }

          // Discount Factor
          dcf = 1 / (1 + discountRate) ** year;

          // Discounted Cashflow
          dcCfW = (scW - rcB) * dcf;
          dcCfB = (scB - rcW) * dcf;

          // NPV
          npvW = dcCfW / (1 + discountRate) ** year;
          npvB = dcCfB / (1 + discountRate) ** year;

          // Discounted Saved Costs
          dcScW = scW * dcf;
          dcScB = scB * dcf;

          // Discounted Real Costs
          dcRcW = rcW * dcf;
          dcRcB = rcB * dcf;

          // Cumulative Discounted Cashflow
          cDcCfW += dcCfW;
          cDcCfB += dcCfB;

          // Cumulative NPV
          cNpvW += npvW;
          cNpvB += npvB;

          // Total row
          this.totalSCW += scW;
          this.totalSCB += scB;
          this.totalRCW += rcW;
          this.totalRCB += rcB;
          this.totalDcCfW += dcCfW;
          this.totalDcCfB += dcCfB;
          this.totalNPVW += npvW;
          this.totalNPVB += npvB;
          this.totalDcSCW += dcScW;
          this.totalDcSCB += dcScB;
          this.totalDcRCW += dcRcW;
          this.totalDcRCB += dcRcB;

          // Cost-Benefit Analysis
          this.cbNpvWorst += npvW;
          this.cbNpvBest += npvB;

          this.rows.push({
            year: year,
            savedCostsWorst: scW,
            savedCostsBest: scB,
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

        this.roiRatioWorst = this.totalDcCfW / this.data.INVESTMENT_MAX;
        this.roiRatioBest = this.totalDcCfB / this.data.INVESTMENT_MIN;

        this.roiRatioUndcWorst =
          (this.totalSCW - this.totalRCB) / this.data.INVESTMENT_MAX;
        this.roiRatioUndcBest =
          (this.totalSCB - this.totalRCW) / this.data.INVESTMENT_MIN;

        this.bcRatioWorst = this.totalDcSCW / this.totalDcRCB;
        this.bcRatioBest = this.totalDcSCB / this.totalDcRCW;

        this.bcRatioUndcWorst = this.totalSCW / this.totalRCB;
        this.bcRatioUndcBest = this.totalSCB / this.totalRCW;
      });
  }

  active = 1;
}
