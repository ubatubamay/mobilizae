import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  hasStyle = false;
  styleLgExp = {
    'font-size': '40px',
    color: 'lightgreen'
  };

  constructor() {}

  ngOnInit() {}

}
