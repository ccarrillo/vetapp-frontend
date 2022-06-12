import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nacimiento',
  templateUrl: './nacimiento.component.html',
  styleUrls: ['./nacimiento.component.sass']
})
export class NacimientoComponent implements OnInit {

  breadscrums = [
    {
      title: 'Nacimientos',
      items: ['Reproducción'],
      active: 'Nacimientos'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
