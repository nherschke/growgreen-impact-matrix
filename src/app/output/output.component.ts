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
  cumDcNPVWorst: number;
  cumDcNPVBest: number;
}

const ROWS: Row[] = [
  {
    year: 1,
    savedCostsWorst: 231,
    savedCostsBest: 355,
    realCostsWorst: 3000,
    realCostsBest: 2000,
    discountFactor: 0.01,
    dcCashflowWorst: 339,
    dcCashflowBest: 234,
    npvWorst: 2,
    npvBest: 32,
    dcSavedCostsWorst: 234,
    dcSavedCostsBest: 234,
    dcRealCostsWorst: 231,
    dcRealCostsBest: 234,
    cumDcCashflowWorst: 234,
    cumDcCashflowBest: 2355,
    cumDcNPVWorst: 22,
    cumDcNPVBest: 23,
  },
];

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
      discountRate: '0',
    });

    this.discountButtonsForm
      .get('discountRate')
      .valueChanges.subscribe((value) => {
        this.rows = [];

        let discountRate: number = +value;

        for (let i = 0; i < 50; i++) {
          let year = i + 1;
          let scw =
            (this.data.AIR_QUALITY_MONETIZATION_MIN +
              this.data.WATER_RETENTION_MIN +
              this.data.ENERGY_COST_REDUCTION_MIN +
              //this.data.MEMBRANE_LONGEVITY_COST +
              this.data.PROPERTY_VALUE) /
            year;

          this.rows.push({
            year: year,
            savedCostsWorst: scw,
            savedCostsBest: 355,
            realCostsWorst: 3000,
            realCostsBest: 2000,
            discountFactor: discountRate,
            dcCashflowWorst: 339,
            dcCashflowBest: 234,
            npvWorst: 2,
            npvBest: 32,
            dcSavedCostsWorst: 234,
            dcSavedCostsBest: 234,
            dcRealCostsWorst: 231,
            dcRealCostsBest: 234,
            cumDcCashflowWorst: 234,
            cumDcCashflowBest: 2355,
            cumDcNPVWorst: 22,
            cumDcNPVBest: 23,
          });
        }
      });
  }

  active = 1;
}
