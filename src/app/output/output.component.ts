import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppData } from '../app.data';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.css'],
})
export class OutputComponent implements OnInit {
  method: string;
  precipitation: number = 330;
  lifespan: number = 22;
  wallSize: number = 50;
  investment: number = 4000;

  constructor(private route: ActivatedRoute, private data: AppData) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.method = params['method'];
    });
  }

  active = 1;
}
