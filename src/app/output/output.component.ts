import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.css'],
})
export class OutputComponent implements OnInit {
  precipitation: number = 330;
  lifespan: number = 22;

  constructor() {}

  ngOnInit(): void {}

  active = 1;
}
