import { EventEmitter, ViewChild, Component, Input, Output } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { bounceOutDownOnLeaveAnimation, fadeInUpOnEnterAnimation } from '../_animations';
import { IBook } from '../_interfaces';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
  animations: [
    fadeInUpOnEnterAnimation({ anchor: 'enter', duration: 500, delay: 100, translate: '30px' }),
    bounceOutDownOnLeaveAnimation({ anchor: 'leave', duration: 500, delay: 200, translate: '40px' })
  ],
})
export class BooksComponent {
  public title = "Books List";
  @Input('books') books: IBook[] = [];
  @Input('selectedBook') selectedBook!: IBook;
  @Output('selectBook') onClickBook = new EventEmitter<IBook>();
  @Output('editBook') onClickEditIcon = new EventEmitter<IBook>();
  @Output('deleteBook') onClickDeleteIcon = new EventEmitter<IBook>();
  @ViewChild(MatMenuTrigger, { static: true }) contextMenu!: MatMenuTrigger;
  public contextMenuPosition = { x: '0px', y: '0px' };

  constructor() {
  }

  isActive(book: IBook): boolean {
    return book.id === this.selectedBook?.id;
  }

  deleteBook(book: IBook) {
    this.onClickDeleteIcon.emit(book);
  }

  editBook(book: IBook) {
    this.onClickEditIcon.emit(book);
  }

  onContextMenu(book: IBook, event: MouseEvent) {
    event.stopPropagation();
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = { item: book };
    this.contextMenu.menu.focusFirstItem('mouse');
    this.contextMenu.openMenu();
  }
}
