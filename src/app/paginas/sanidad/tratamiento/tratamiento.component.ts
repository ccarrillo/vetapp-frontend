import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tratamiento',
  templateUrl: './tratamiento.component.html',
  styleUrls: ['./tratamiento.component.sass']
})
export class TratamientoComponent implements OnInit {

  breadscrums = [
    {
      title: 'Tratamiento',
      items: ['Sanidad'],
      active: 'Tratamiento'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
