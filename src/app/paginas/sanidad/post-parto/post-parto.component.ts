import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-parto',
  templateUrl: './post-parto.component.html',
  styleUrls: ['./post-parto.component.sass']
})
export class PostPartoComponent implements OnInit {

  breadscrums = [
    {
      title: 'Post-Parto',
      items: ['Sanidad'],
      active: 'Post-Parto'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
