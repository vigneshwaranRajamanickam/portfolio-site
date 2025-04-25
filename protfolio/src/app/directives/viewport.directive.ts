import { Directive, ElementRef, EventEmitter, Output } from '@angular/core';

@Directive({
  selector: '[appInViewport]'
})
export class ViewportDirective {
  @Output() inViewport = new EventEmitter<IntersectionObserverEntry[]>();
  private observer: IntersectionObserver;

  constructor(private el: ElementRef) {
    this.observer = new IntersectionObserver((entries) => {
      this.inViewport.emit(entries);
    }, {
      threshold: 0.1
    });

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy() {
    this.observer.disconnect();
  }

}
