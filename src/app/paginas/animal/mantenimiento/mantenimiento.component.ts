import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mantenimiento',
  templateUrl: './mantenimiento.component.html',
  styleUrls: ['./mantenimiento.component.sass']
})
export class MantenimientoComponent implements OnInit {

  breadscrums = [
    {
      title: 'Mantenimiento',
      items: ['Animal'],
      active: 'Mantenimiento'
    }
  ];
  
  constructor() { }

  ngOnInit(): void {
  }

}
