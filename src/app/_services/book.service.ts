import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AddReviewDto, IBook } from '../_interfaces';
import { books } from '../_db';
import { map } from 'rxjs/operators';
import { sortByLatest } from '../_helpers';

@Injectable({ providedIn: 'root' })
export class BookService {
  private _bookSubject = new BehaviorSubject<IBook[]>(books);

  constructor() { }

  getBooks(): Observable<IBook[]> {
    return this._bookSubject.asObservable().pipe(
      map(books => {
        const sortedBooks = books.sort(sortByLatest);
        return sortedBooks;
      })
    );
  }

  addNewBook(newBook: IBook): Observable<'ok'> {
    const updated = [
      ...this._bookSubject.value,
      <IBook>{ ...newBook, createdAt: new Date().toISOString() }
    ];
    this._bookSubject.next(updated);
    return of('ok');
  }

  addBookReview(dto: AddReviewDto): Observable<'ok'> {
    const updated = this._bookSubject.value.map(book => {
      if (book.name === dto.selectedBookId) {
        if (book.reviews) {
          book.reviews.push(dto.reviewBody);
        } else {
          book.reviews = [dto.reviewBody];
        }
      }
      return book;
    });
    this._bookSubject.next(updated)
    return of('ok')
  }
}
