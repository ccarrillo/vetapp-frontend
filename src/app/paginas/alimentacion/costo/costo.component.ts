import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-costo',
  templateUrl: './costo.component.html',
  styleUrls: ['./costo.component.sass']
})
export class CostoComponent implements OnInit {

  breadscrums = [
    {
      title: 'Costo',
      items: ['Alimentación'],
      active: 'Costo'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
