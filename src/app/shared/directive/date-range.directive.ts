import { Directive, ElementRef, Renderer, Input } from '@angular/core';

@Directive({ selector: '[date-range]' }) // , inputs: ['retina']
export class DateRangeDirective
{
  @Input() retina: string;

  constructor(private el: ElementRef, private renderer: Renderer) { }

  ngOnInit() {
    console.log('-----------------------TYR', this.el.nativeElement);
      this.renderer.setElementAttribute(this.el.nativeElement, 'data-content', 'adi');
 }

}



/*
import {Directive, ElementRef, Renderer} from '@angular/core';

@Directive({selector: '[date-range]'})
export class DateRangeDirective
{
  private _el: HTMLElement;

  constructor(private el: ElementRef, private renderer: Renderer) {  }

  ngOnInit() {

    this.renderer.setElementProperty(this.el.nativeElement, 'src', 'MASTA WORKS');

    console.log('it works!');
  }

  }
*/
