import {Directive, ElementRef, Input, OnInit, OnDestroy} from '@angular/core'
import {Gesture} from 'ionic-angular/gestures/gesture'

@Directive({
  selector: '[swipe-vertical]' // Attribute selector
})
export class SwipeVertical {
    static get parameters() {
    return [[HTMLElement],[Gesture],[Gesture]];
  }
  
  constructor(el, swipeGesture, swipeDownGesture) {
    this.el=el;
	this.swipeGesture=swipeGesture;
	this.swipeDownGesture;
	this.el = el.nativeElement
	this.swipeGesture = new Gesture(this.el, {
      recognizers: [
        [Hammer.Swipe, {direction: Hammer.DIRECTION_VERTICAL}]
      ]
    });
    this.swipeGesture.listen()
    this.swipeGesture.on('swipeup', e => {
      this.actionUp()
    })
    this.swipeGesture.on('swipedown', e => {
      this.actionDown()
    })
  }
}