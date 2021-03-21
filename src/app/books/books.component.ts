import { EventEmitter } from '@angular/core';
import { Component, Input, Output } from '@angular/core';
import { bounceOutDownOnLeaveAnimation, fadeInUpOnEnterAnimation } from '../_animations';
import { IBook } from '../_interfaces';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
  animations: [
    fadeInUpOnEnterAnimation({ anchor: 'enter', duration: 500, delay: 100, translate: '30px' }),
    bounceOutDownOnLeaveAnimation({ anchor: 'leave', duration: 500, delay: 200, translate: '40px' })
  ]
})
export class BooksComponent {
  public title = "Books List";
  @Input('books') books: IBook[] = [];
  @Input('selectedBook') selectedBook!: IBook;
  @Output('selectBook') onClickBook = new EventEmitter<IBook>();
  @Output('deleteBook') onClickDeleteIcon = new EventEmitter<IBook>();

  constructor() {
  }

  isActive(book: IBook): boolean {
    return book.name === this.selectedBook?.name;
  }

  deleteBook(event: Event, book: IBook) {
    event.stopPropagation();
    this.onClickDeleteIcon.emit(book);
  }

}
