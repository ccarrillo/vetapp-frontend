import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-leche-venta',
  templateUrl: './leche-venta.component.html',
  styleUrls: ['./leche-venta.component.sass']
})
export class LecheVentaComponent implements OnInit {

  breadscrums = [
    {
      title: 'Venta de Leche',
      items: ['Producción'],
      active: 'Venta de Leche'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
