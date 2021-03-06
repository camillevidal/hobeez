import { Component, Input, ViewChildren, QueryList, ElementRef,Renderer2, Output, EventEmitter } from '@angular/core';
import {HomePage} from '../home/home.page'
import { NavController } from '@ionic/angular';

@Component({
  selector: 'slide-loisirs',
  templateUrl: './slide-loisirs.page.html',
  styleUrls: ['./slide-loisirs.page.scss'],
})
export class SlideLoisirsPage{

  @Input('cards') cards: Array<{
    img: string,
    title: string,
    description: string,
    place_id:string
  }>;
  @Output() choiceMade = new EventEmitter();

  @ViewChildren('tinderCard') tinderCards: QueryList<ElementRef>;
  
  tinderCardsArray: Array<ElementRef>;
  
  moveOutWidth: number; // value in pixels that a card needs to travel to dissapear from screen
  shiftRequired: boolean; // state variable that indicates we need to remove the top card of the stack
  transitionInProgress: boolean; // state variable that indicates currently there is transition on-going
  heartVisible: boolean;
  crossVisible: boolean;

  constructor(private renderer: Renderer2, private navCtrl: NavController) { // we imported Renderer to be able to alter style's of elements safely
  }

  userClickedButton(event, heart) {
    event.preventDefault();
    if (!this.cards.length) return false;
    if (heart) {
      this.tinderCardsArray[0].nativeElement.style.transform = 'translate(' + this.moveOutWidth + 'px, -100px) rotate(-30deg)';
      this.toggleChoiceIndicator(false,true);
    } else {
      this.tinderCardsArray[0].nativeElement.style.transform = 'translate(-' + this.moveOutWidth + 'px, -100px) rotate(30deg)';
      this.toggleChoiceIndicator(true,false);
    };
    this.shiftRequired = true;
    this.transitionInProgress = true;
  };

  toggleChoiceIndicator(cross, heart) {
    this.crossVisible = cross;
    this.heartVisible = heart;
  };

  handleShift() {
    this.transitionInProgress = false;
    this.toggleChoiceIndicator(false,false)
    if (this.shiftRequired) {
      this.shiftRequired = false;
      this.cards.shift();
    };
  };

  ngAfterViewInit() {
    this.moveOutWidth = document.documentElement.clientWidth * 1.5;
    this.tinderCardsArray = this.tinderCards.toArray();
    this.tinderCards.changes.subscribe(()=>{
      this.tinderCardsArray = this.tinderCards.toArray();
    })
  };


//fonctions pour les slides hammer js


handlePan(event) {

  if (event.deltaX === 0 || (event.center.x === 0 && event.center.y === 0) || !this.cards.length) return;

  if (this.transitionInProgress) {
    this.handleShift();
  }

  this.renderer.addClass(this.tinderCardsArray[0].nativeElement, 'moving');

  if (event.deltaX > 0) { this.toggleChoiceIndicator(false,true) }
  if (event.deltaX < 0) { this.toggleChoiceIndicator(true,false) }

  let xMulti = event.deltaX * 0.03;
  let yMulti = event.deltaY / 80;
  let rotate = xMulti * yMulti;

  this.renderer.setStyle(this.tinderCardsArray[0].nativeElement, 'transform', 'translate(' + event.deltaX + 'px, ' + event.deltaY + 'px) rotate(' + rotate + 'deg)');

  this.shiftRequired = true;

};

handlePanEnd(event) {

  this.toggleChoiceIndicator(false,false);

  if (!this.cards.length) return;

  this.renderer.removeClass(this.tinderCardsArray[0].nativeElement, 'moving');

  let keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;
  if (keep) {

    this.renderer.setStyle(this.tinderCardsArray[0].nativeElement, 'transform', '');
    this.shiftRequired = false;

  } else {

    let endX = Math.max(Math.abs(event.velocityX) * this.moveOutWidth, this.moveOutWidth);
    let toX = event.deltaX > 0 ? endX : -endX;
    let endY = Math.abs(event.velocityY) * this.moveOutWidth;
    let toY = event.deltaY > 0 ? endY : -endY;
    let xMulti = event.deltaX * 0.03;
    let yMulti = event.deltaY / 80;
    let rotate = xMulti * yMulti;

    this.renderer.setStyle(this.tinderCardsArray[0].nativeElement, 'transform', 'translate(' + toX + 'px, ' + (toY + event.deltaY) + 'px) rotate(' + rotate + 'deg)');

    this.shiftRequired = true;

    this.emitChoice(!!(event.deltaX > 0), this.cards[0]);
  }
  this.transitionInProgress = true;
};



emitChoice(heart, card) {
  this.choiceMade.emit({
    choice: heart,
    payload: card
  })
};

details(index:number){
  console.log(this.cards[index])
  localStorage.removeItem("place_id")
  localStorage.setItem("place_id", this.cards[index].place_id)
  localStorage.removeItem("photo_reference")
  localStorage.setItem("photo_reference", this.cards[index].img)
  this.navCtrl.navigateForward('/tabs/details');
}



}


