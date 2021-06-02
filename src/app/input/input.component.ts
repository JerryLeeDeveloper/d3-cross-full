import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { numberValidator } from '../shared/valid-number.directive';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  data = {
    dataA: 0,
    dataB: 0,
    dataC: 0
  };
  dataForm: FormGroup;
  constructor() { }

  ngOnInit() {
    this.dataForm = new FormGroup({
      'dataA': new FormControl(this.data.dataA, [
        Validators.required,
        numberValidator({max: 100, min: -100})
      ]),
      'dataB': new FormControl(this.data.dataB, [
        Validators.required,
        numberValidator({max: 100, min: -100})
      ]),
      'dataC': new FormControl(this.data.dataC, [
        Validators.required,
        numberValidator({max: 100, min: -100})
      ]),
    });
  }

  onSubmit() {
    console.warn(this.dataForm.value);
    console.warn(this.dataForm.valid);
    console.warn(this.findInvalidControls());
  }

  findInvalidControls() {
    const invalid = [];
    const controls = this.dataForm.controls;
    for (const name in controls) {
        if (controls[name].invalid) {
            invalid.push(name);
        }
    }
    return invalid;
  }

  get dataA() { return this.dataForm.get('dataA'); }

  get dataB() { return this.dataForm.get('dataB'); }

  get dataC() { return this.dataForm.get('dataC'); }

}
