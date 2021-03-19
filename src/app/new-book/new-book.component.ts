import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BookService } from '../_services';

@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.scss']
})
export class NewBookComponent implements OnInit, OnDestroy {
  public bookForm!: FormGroup;
  private _destroy$ = new Subject();
  @ViewChild(FormGroupDirective) formGroupDirective!: FormGroupDirective;

  constructor(
    private _fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _bookService: BookService
  ) { }

  ngOnInit(): void {
    this.bookForm = this._fb.group({
      name: ['', [Validators.required]],
      year: [null],
    });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  get name(): AbstractControl {
    return this.bookForm.get('name')!;
  }

  get year(): AbstractControl {
    return this.bookForm.get('year')!;
  }

  getErrorMessage(fieldName: string) {
    if (fieldName === 'name') {
      return this.name.hasError('required') ? "Book\'s name is required!" : "";
    }
    return;
  }

  submitForm(): void {
    if (this.bookForm.valid) {
      this._bookService
        .addNewBook(this.bookForm.value)
        .pipe(takeUntil(this._destroy$))
        .subscribe(res => {
          if (res == 'ok') {
            this._snackBar.open('Book added!', 'close', { duration: 3000 });
            alert(JSON.stringify(this.bookForm.value));
            this.formGroupDirective.resetForm();
          }
        })
    }
  }

}
