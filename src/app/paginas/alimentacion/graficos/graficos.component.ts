import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.sass']
})
export class GraficosComponent implements OnInit {

  breadscrums = [
    {
      title: 'Graficos',
      items: ['Alimentación'],
      active: 'Graficos'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
