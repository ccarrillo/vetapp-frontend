import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-podologia',
  templateUrl: './podologia.component.html',
  styleUrls: ['./podologia.component.sass']
})
export class PodologiaComponent implements OnInit {

  breadscrums = [
    {
      title: 'Podología',
      items: ['Sanidad'],
      active: 'Podología'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
