import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.sass']
})
export class UsuarioComponent implements OnInit {

  breadscrums = [
    {
      title: 'Usuario',
      items: ['Administración'],
      active: 'Usuario'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
