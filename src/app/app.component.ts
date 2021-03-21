import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
import { ConfirmDialogComponent } from './_components';
import { IBook } from './_interfaces';
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

  selectBook(event: IBook) {
    this.selectedBook = event;
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
        switchMap(() => this._bookService.removeBook(book.name)),
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
