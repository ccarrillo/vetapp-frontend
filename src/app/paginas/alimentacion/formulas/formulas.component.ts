import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formulas',
  templateUrl: './formulas.component.html',
  styleUrls: ['./formulas.component.sass']
})
export class FormulasComponent implements OnInit {

  breadscrums = [
    {
      title: 'Formulas',
      items: ['Alimentación'],
      active: 'Formulas'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
