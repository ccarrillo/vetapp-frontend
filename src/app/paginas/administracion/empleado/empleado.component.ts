import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.sass']
})
export class EmpleadoComponent implements OnInit {

  breadscrums = [
    {
      title: 'Empleado',
      items: ['Administración'],
      active: 'Empleado'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
