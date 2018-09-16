import { Component, OnInit , OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StarWarServices } from '../star-wars.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {

 // @Input() characters;
 // @Output() sideAssigned = new EventEmitter<{ name: string , side: string}>();

  characters = [];
  activatedRoute: ActivatedRoute;
  swService: StarWarServices;
  subscription;
  changedSide = 'all';

  constructor( activatedRoute: ActivatedRoute, swService: StarWarServices) {
    this.activatedRoute = activatedRoute;
    this.swService = swService;
   }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params) => {
          this.characters = this.swService.getCharacters(params.side);
          this.changedSide = params.side;
      });
     this.subscription = this.swService.charactersChanged.subscribe(
      () => {
        this.characters = this.swService.getCharacters(this.changedSide);
      });
  }

  ngOnDestroy() {
    console.log('OnDestroy');
    this.subscription.unsubscribe();
  }

  // onSideAssigned(charInfo) {
  //   this.sideAssigned.emit(charInfo);
  // }

}
