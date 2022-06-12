import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.sass']
})
export class ReporteComponent implements OnInit {

  breadscrums = [
    {
      title: 'Reporte',
      items: ['Animal'],
      active: 'Reporte'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
