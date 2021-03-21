import { IReview } from "./review.interface";

export interface BookDto {
  name: string;
  year: string | Date;
  imageUrl?: string;
}

export interface ReviewDto {
  bookId: number;
  reviewBody: IReview;
}