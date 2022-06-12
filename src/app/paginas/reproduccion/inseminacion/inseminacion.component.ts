import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inseminacion',
  templateUrl: './inseminacion.component.html',
  styleUrls: ['./inseminacion.component.sass']
})
export class InseminacionComponent implements OnInit {

  breadscrums = [
    {
      title: 'Inseminación',
      items: ['Reproducción'],
      active: 'Inseminación'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
