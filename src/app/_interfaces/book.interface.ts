import { IReview } from "./review.interface";

export interface IBook {
  name: string;
  year: string | Date;
  imageUrl?: string;
  reviews?: IReview[]; // use also for dto
  createdAt: string | Date;
}