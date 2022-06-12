import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-leche-pesado',
  templateUrl: './leche-pesado.component.html',
  styleUrls: ['./leche-pesado.component.sass']
})
export class LechePesadoComponent implements OnInit {

  breadscrums = [
    {
      title: 'Pesado de Leche',
      items: ['Producción'],
      active: 'Pesado de Leche'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
