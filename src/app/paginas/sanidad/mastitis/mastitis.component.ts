import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mastitis',
  templateUrl: './mastitis.component.html',
  styleUrls: ['./mastitis.component.sass']
})
export class MastitisComponent implements OnInit {

  breadscrums = [
    {
      title: 'Mastitis',
      items: ['Sanidad'],
      active: 'Mastitis'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
