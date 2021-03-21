import { AfterViewInit, ContentChild, Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[float-button]',
})
export class FloatButtonDirective implements AfterViewInit {
  constructor(
    private _elRef: ElementRef<HTMLElement | HTMLButtonElement>,
    private _rd: Renderer2
  ) { }

  get nativeElement(): HTMLElement | HTMLButtonElement {
    return this._elRef.nativeElement;
  }

  ngAfterViewInit(): void {
    const styles: any = {
      display: 'none',
      position: 'absolute',
      right: 0,
      top: 0,
      ' background-color': '#f4f4f4',
      border: 'none',
      outline: 'none',
      cursor: 'pointer',
    };

    Object.keys(styles).forEach(k => {
      this._rd.setStyle(this.nativeElement, k, styles[k]);
    });
  }
}

@Directive({ selector: '[floatContainer]' })
export class FloatContainerDirective {
  constructor(private _rd: Renderer2) { }

  @ContentChild(FloatButtonDirective) child!: FloatButtonDirective;

  @HostListener('mouseenter')
  displayFloatIcon() {
    if (this.child.nativeElement) {
      this._rd.setStyle(this.child.nativeElement, 'display', 'block');
    }
  }

  @HostListener('mouseleave')
  hideFloatIcon() {
    if (this.child.nativeElement) {
      this._rd.setStyle(this.child.nativeElement, 'display', 'none');
    }
  }
}
