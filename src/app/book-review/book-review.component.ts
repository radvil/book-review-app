import {
  Component,
  Input,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IBook, IReview } from '../_interfaces';
import { BookService } from '../_services';

@Component({
  selector: 'app-book-review',
  templateUrl: './book-review.component.html',
  styleUrls: ['./book-review.component.scss'],
})
export class BookReviewComponent implements OnDestroy {
  private _destroy$ = new Subject();
  @Input('selectedBook') selectedBook!: IBook;
  @ViewChild(FormGroupDirective) formGroupDirective!: FormGroupDirective;
  public starsArr = new Array(5);

  public reviewForm = this._fb.group({
    email: ['', [Validators.required, Validators.email]],
    note: ['', [Validators.required]],
    star: [1, [Validators.min(1), Validators.max(5)]],
  });

  constructor(
    private _fb: FormBuilder,
    private _bookService: BookService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  get email(): AbstractControl {
    return this.reviewForm.get('email')!;
  }

  get note(): AbstractControl {
    return this.reviewForm.get('note')!;
  }

  get star(): AbstractControl {
    return this.reviewForm.get('star')!;
  }

  getIcon(review: IReview, index: number) {
    if (review.star >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

  getErrorMessage(fieldName: string) {
    if (fieldName === 'email') {
      return this.email.hasError('email')
        ? 'Invalid email format!'
        : 'Email is required!';
    }
    if (fieldName === 'note') {
      return this.note.hasError('required') ? 'You must provide a note!' : '';
    }
    if (fieldName === 'star') {
      return this.star.hasError('max')
        ? 'Maximum 5 stars allowed'
        : 'Minimum 1 star allowed!';
    }
    return;
  }

  submitForm(): void {
    const selectedBookId = this.selectedBook.name;
    const reviewBody = this.reviewForm.value;

    if (selectedBookId && reviewBody) {
      this._bookService
        .addBookReview({ selectedBookId, reviewBody })
        .pipe(takeUntil(this._destroy$))
        .subscribe((res) => {
          if (res === 'ok') {
            this._snackBar.open(`You review ${this.selectedBook.name}`, 'ok', {
              duration: 3000,
            });
            alert(JSON.stringify(this.reviewForm.value));
            this.formGroupDirective.resetForm();
          }
        });
    }
  }
}
