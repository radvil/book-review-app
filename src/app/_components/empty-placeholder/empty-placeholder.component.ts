import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'empty-placeholder',
  template: `
    <div class="placeholder">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .placeholder {
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `]
})
export class EmptyPlaceholderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
