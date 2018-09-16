import { Component, OnInit } from '@angular/core';
import { StarWarServices } from './star-wars.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'star-war-app';
  swService: StarWarServices;

  constructor(swService: StarWarServices) {
    this.swService = swService;
  }

  ngOnInit() {
    this.swService.fetchCharacters();
  }
}
