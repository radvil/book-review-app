import { EventEmitter } from '@angular/core';
import { Component, Input, Output } from '@angular/core';
import { IBook } from '../_interfaces';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent {
  public title = "Books List";
  @Input('books') books: IBook[] = [];
  @Input('selectedBook') selectedBook!: IBook;
  @Output('selectBook') onClickBook = new EventEmitter<IBook>();

  constructor() {
  }
  
}
