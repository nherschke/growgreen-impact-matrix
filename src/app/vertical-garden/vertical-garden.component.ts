import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-vertical-garden',
  templateUrl: './vertical-garden.component.html',
  styleUrls: ['./vertical-garden.component.css']
})
export class VerticalGardenComponent implements OnInit {
  inputForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.inputForm = this.formBuilder.group({
      precipitation: '',
      lifespan: '',
    });

    this.inputForm.valueChanges.subscribe(console.log);
  }

  onSubmit(): void {
    console.log(this.inputForm);
  }
}
