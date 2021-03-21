import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BookDto, IBook } from '../_interfaces';
import { BookService } from '../_services';

@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.scss']
})
export class NewBookComponent implements OnInit, OnDestroy {
  public bookForm!: FormGroup;
  private _destroy$ = new Subject();
  public mode = this.data.book ? 'EDIT' : 'ADD';
  @ViewChild(FormGroupDirective) formGroupDirective!: FormGroupDirective;

  constructor(
    private _fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _bookService: BookService,
    @Inject(MAT_DIALOG_DATA) public data: { book: IBook },
    public dialogRef: MatDialogRef<NewBookComponent>,
  ) { }

  ngOnInit(): void {
    this.bookForm = this._fb.group({
      name: ['', [Validators.required]],
      year: [null],
    });

    if (this.mode === 'EDIT') {
      this.bookForm.patchValue({
        name: this.data.book.name,
        year: this.data.book.year
      });
    }
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
      // if is editMode
      if (this.data.book) {
        this.dialogRef.close({ mode: this.mode, book: this.bookForm.value });
      } else {
        this._bookService
          .addNewBook(<BookDto>this.bookForm.value)
          .pipe(takeUntil(this._destroy$))
          .subscribe(res => {
            if (res == 'ok') {
              this._snackBar.open(`${this.name.value} added!`, 'ok', { duration: 3000 });
              this.formGroupDirective.resetForm();
            }
          })
      }
    }
  }

}
