import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-vertical-garden',
  templateUrl: './vertical-garden.component.html',
  styleUrls: ['./vertical-garden.component.css'],
})
export class VerticalGardenComponent implements OnInit {
  inputForm: FormGroup;
  toggle: boolean = true;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.inputForm = this.formBuilder.group({
      precipitation: '',
      lifespan: '',
      wallSize: '',
      investment: '',
      toggle: '1',
    });

    this.inputForm.get('toggle').valueChanges.subscribe((value) => {
      if (value === '1') {
        this.toggle = true;
      } else {
        this.toggle = false;
      }
    });
  }

  onSubmit(): void {
    console.log(this.inputForm);
  }
}
