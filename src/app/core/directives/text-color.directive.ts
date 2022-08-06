import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appTextColor]'
})
export class TextColorDirective implements OnInit {

  @Input() result: number = 0;

  constructor(private el: ElementRef) { }

  ngOnInit() {
    if (this.result <= 100 && this.result >= 90) {
      this.el.nativeElement.style.color = 'green';
    } else if (this.result <= 89 && this.result >= 79) {
      this.el.nativeElement.style.color = 'orange';
    } else if (this.result <= 79 && this.result >= 59) {
      this.el.nativeElement.style.color = 'red';
    } else if (this.result <= 59 && this.result >= 0) {
      this.el.nativeElement.style.color = 'gray';
    }
  }
}
