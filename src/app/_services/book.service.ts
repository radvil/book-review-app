import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { BookDto, ReviewDto, IBook } from '../_interfaces';
import { books } from '../_db';
import { map } from 'rxjs/operators';
import { sortByLatest } from '../_helpers';

@Injectable({ providedIn: 'root' })
export class BookService {
  private _currentBookId = 2;
  private _bookSubject = new BehaviorSubject<IBook[]>(books);

  constructor() {}

  getBooks(): Observable<IBook[]> {
    return this._bookSubject.asObservable().pipe(
      map((books) => {
        const sortedBooks = books.sort(sortByLatest);
        return sortedBooks;
      })
    );
  }

  addNewBook(newBook: BookDto): Observable<'ok'> {
    const updatedState = [...this._bookSubject.value, {
      id: ++this._currentBookId,
      ...newBook,
      createdAt: new Date().toISOString(),
    }];
    this._bookSubject.next(updatedState);
    return of('ok');
  }

  updateBook(bookId: number, dto: BookDto): Observable<'ok'> {
    const updatedState = this._bookSubject.value?.map((book) => {
      if (book.id === bookId) {
        book = { ...book, ...dto };
      }
      return book;
    });
    this._bookSubject.next(updatedState);
    return of('ok');
  }

  addBookReview(dto: ReviewDto): Observable<'ok'> {
    const updated = this._bookSubject.value.map((book) => {
      if (book.id === dto.bookId) {
        if (book.reviews) {
          book.reviews.push(dto.reviewBody);
        } else {
          book.reviews = [dto.reviewBody];
        }
      }
      return book;
    });
    this._bookSubject.next(updated);
    return of('ok');
  }

  /**
   *
   * @param bookId again I said, because we don't have the actual id generated, we use the book's name here.
   */
  removeBook(bookId: number): Observable<'ok'> {
    const updated = this._bookSubject.value.filter((b) => b.id !== bookId);
    this._bookSubject.next(updated);
    return of('ok');
  }
}
