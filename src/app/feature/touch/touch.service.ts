import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class TouchService {
  DWtable = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
  ]

  constructor(
    private bulider: FormBuilder,
  ) { }


  createSettingForms(): FormGroup {
    return this.bulider.group({
      D: 0,
      W: 0
    });
  }
}
