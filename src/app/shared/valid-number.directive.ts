import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, Validators, ValidationErrors } from '@angular/forms';

import { isSafeInteger, isSafeFloat } from '../shared/type.util';

export function numberValidator(prms: any): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const val: string = control.value;
    if (!(isSafeInteger(val) || isSafeFloat(val))) {
        return {number: {type: true}};
    } else if (!isNaN(prms.min) && (!isNaN(prms.max))) {
      const validMin = val < prms.min;
      const validMax = val > prms.max;
      return validMin || validMax ? {number: {min: validMin, max: validMax}} : null;
    } else if (!isNaN(prms.min)) { // need test
      return val < prms.min ? {number: {min: true}} : null;
    } else if (!isNaN(prms.max)) {
      return val > prms.max ? {number: {max: true}} : null;
    } else {
      return null;
    }
  };
}

@Directive({
  selector: '[appNumber]',
  providers: [{provide: NG_VALIDATORS, useExisting: NumberValidatorDirective, multi: true}]
})
export class NumberValidatorDirective implements Validator {
  @Input('appNumber') prms: any;

  validate(control: AbstractControl): ValidationErrors {
    return numberValidator(this.prms)(control);
  }
}