import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of, Subject } from 'rxjs';
import { catchError, filter, switchMap, takeUntil } from 'rxjs/operators';
import { NewBookComponent } from './new-book/new-book.component';
import { ConfirmDialogComponent } from './_components';
import { BookDto, IBook } from './_interfaces';
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
   * Because we don't have unique id for each book, we're going to use the name field.
   * Let's just make sure to input book's name uniquely those differs from each other.
   *
   */
  public selectedBook!: IBook | undefined;

  constructor(
    private _bookService: BookService,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this._bookService
      .getBooks()
      .pipe(takeUntil(this._destroy$))
      .subscribe((books) => {
        this.books = books;
      });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  selectBook(book: IBook) {
    this.selectedBook = book;
  }

  editBook(book: IBook) {
    const { reviews, ...bookWithNoReviews } = book;
    const dialog = this._dialog.open(NewBookComponent, {
      minWidth: '777px',
      panelClass: 'editBookPanel',
      data: { book: bookWithNoReviews }
    })
      .beforeClosed()
      .pipe(
        filter((data: { mode: string, book: BookDto }) => data.mode === 'EDIT'),
        switchMap((data) => this._bookService.updateBook(book.id, data.book)),
        catchError(error => of(error)), // return default close dialog data when null
        takeUntil(this._destroy$)
      );

    dialog.subscribe((res) => {
      if (res === 'ok') {
        this.selectedBook = undefined;
        this._snackBar
          .open(
            `${book.name} updated successfully!`,
            'close',
            { duration: 3000 }
          );
      }
    });
  }

  deleteBook(book: IBook) {
    const dialog = this._dialog
      .open(ConfirmDialogComponent, {
        width: '400px',
        data: {
          message: 'Are you sure want to delete this book ?',
        },
      })
      .beforeClosed()
      .pipe(
        filter((confirmed) => confirmed),
        switchMap(() => this._bookService.removeBook(book.id)),
        takeUntil(this._destroy$)
      );

    dialog.subscribe((res) => {
      if (res === 'ok') {
        this.selectedBook = undefined;
        this._snackBar
          .open(
            `${book.name} deleted successfully!`,
            'close',
            { duration: 3000 }
          );
      }
    });
  }
}
