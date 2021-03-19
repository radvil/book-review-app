import { IReview } from "./review.interface";

export interface IBook {
  name: string;
  year: string | Date;
  reviews?: IReview[]; // use also for dto
}