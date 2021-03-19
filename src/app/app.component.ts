import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { AddReviewDto, IBook } from './_interfaces';
import { BookService } from './_services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  public title = 'Book Review';
  public books!: IBook[];
  private _destroy$ = new Subject();
  /**
   * Because we don't have unique id for each book, we're going to use the field.
   * Let's just make sure to input them uniquely differs from each other.
   *
   */
  public selectedBook!: IBook;

  constructor(private _bookService: BookService) {}

  ngOnInit(): void {
    this._bookService
      .getBooks()
      .pipe(takeUntil(this._destroy$))
      .subscribe((books) => {
        this.books = books;
        // if (this.books.length) {
        //   this.selectedBook = this.books[0];
        // }
      });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  selectBook(event: IBook) {
    this.selectedBook = event;
  }
}
