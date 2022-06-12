import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.sass']
})
export class EmpresaComponent implements OnInit {

  breadscrums = [
    {
      title: 'Empresa',
      items: ['Administración'],
      active: 'Empresa'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
