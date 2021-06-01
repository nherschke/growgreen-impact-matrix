import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppData } from '../app.data';
import { CalculationService } from '../calculation.service';
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import { FormBuilder, FormGroup } from '@angular/forms';

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
  }

  active = 1;
}
