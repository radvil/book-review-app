import { IReview } from "./review.interface";

export interface AddReviewDto {
  selectedBookId: string;
  reviewBody: IReview;
}