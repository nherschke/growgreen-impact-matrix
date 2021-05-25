import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-vertical-garden',
  templateUrl: './vertical-garden.component.html',
  styleUrls: ['./vertical-garden.component.css'],
})
export class VerticalGardenComponent implements OnInit {
  inputForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.inputForm = this.formBuilder.group({
      precipitation: '',
      lifespan: '',
      roofsize: [{ value: '', disabled: false }],
      investment: [{ value: '', disabled: true }],
      toggle: '1',
    });

    this.inputForm.get('toggle').valueChanges.subscribe((value) => {
      if (value === '1') {
        this.inputForm.get('investment').reset();
        this.inputForm.get('investment').disable();
        this.inputForm.get('roofsize').enable();
      } else {
        this.inputForm.get('roofsize').reset();
        this.inputForm.get('roofsize').disable();
        this.inputForm.get('investment').enable();
      }
    });
  }

  onSubmit(): void {
    console.log(this.inputForm);
  }

  checkToggle(): string {
    let toggle = this.inputForm.get('toggle') as FormControl;
    return toggle.value;
  }
}
