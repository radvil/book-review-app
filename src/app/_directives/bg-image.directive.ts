import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[bgImage]'
})
export class BgImageDirective implements OnInit {
  @Input('bgImage') bgImage!: string | undefined;

  constructor(private _elRef: ElementRef<HTMLElement>, private _rd: Renderer2) {
  }

  ngOnInit(): void {
    const image = this.bgImage ? this.bgImage : 'assets/covers/placeholder.png'
    this._rd.setStyle(this._elRef.nativeElement, 'background-image', `url(${image})`);
    this._rd.setStyle(this._elRef.nativeElement, 'background-size', 'cover');
  }
}
