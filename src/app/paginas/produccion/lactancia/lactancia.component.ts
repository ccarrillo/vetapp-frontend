import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lactancia',
  templateUrl: './lactancia.component.html',
  styleUrls: ['./lactancia.component.sass']
})
export class LactanciaComponent implements OnInit {

  breadscrums = [
    {
      title: 'Lactancia',
      items: ['Producción'],
      active: 'Lactancia'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
