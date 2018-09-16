import { Component, OnInit, Input} from '@angular/core';
import { StarWarServices } from '../star-wars.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  @Input() characters;
 // @Output() sideAssigned = new EventEmitter<{ name: string , side: string}>();
  swService: StarWarServices;

  constructor(swService: StarWarServices) {
    this.swService = swService;
  }

  ngOnInit() {
  }

  onAssign(side) {
    // return this.characters.side = side;
    // this.sideAssigned.emit({name: this.characters.name , side: side});
    this.swService.onSideChosen({name: this.characters.name , side: side});
  }

}
