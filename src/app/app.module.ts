import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/** Material 3rd party */
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatRippleModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';

/** Local Components */
import { AppComponent } from './app.component';
import { NewBookComponent } from './new-book/new-book.component';
import { BooksComponent } from './books/books.component';
import { BookReviewComponent } from './book-review/book-review.component';
import { BgImageDirective, FloatButtonDirective, FloatContainerDirective } from './_directives';
import { EmptyPlaceholderModule } from './_components';

@NgModule({
  declarations: [
    AppComponent,
    NewBookComponent,
    BooksComponent,
    BookReviewComponent,
    BgImageDirective,
    FloatButtonDirective,
    FloatContainerDirective,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatDividerModule,
    MatRippleModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatDialogModule,
    EmptyPlaceholderModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
