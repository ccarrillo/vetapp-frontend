import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.sass']
})
export class InformesComponent implements OnInit {

  breadscrums = [
    {
      title: 'Informes',
      items: ['Producción'],
      active: 'Informes'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
