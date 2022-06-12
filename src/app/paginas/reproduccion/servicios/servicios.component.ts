import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.sass']
})
export class ServiciosComponent implements OnInit {

  breadscrums = [
    {
      title: 'Servicios',
      items: ['Reproducción'],
      active: 'Servicios'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
