import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alimentacion',
  templateUrl: './alimentacion.component.html',
  styleUrls: ['./alimentacion.component.sass']
})
export class AlimentacionComponent implements OnInit {

  breadscrums = [
    {
      title: 'Alimentación',
      items: ['Alimentación'],
      active: 'Alimentación'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
