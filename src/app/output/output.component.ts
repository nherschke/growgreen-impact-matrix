import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppData } from '../app.data';
import { CalculationService } from '../calculation.service';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.css'],
})
export class OutputComponent implements OnInit {
  method: string;
  precipitation: number;
  lifespan: number;
  wallSize: number;
  investment: number;

  constructor(
    private route: ActivatedRoute,
    private data: AppData,
    private calculationService: CalculationService
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
  }

  active = 1;
}
