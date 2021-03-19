import { IBook } from "../_interfaces/book.interface";

export const books: Array<IBook> = [
  {
    name: 'Harry Potter',
    year: '2010',
    reviews: [
      {
        email: 'johndoe@gmail.com',
        note: "This is a note one",
        star: 3
      },
      {
        email: 'janedoe@gmail.com',
        note: "This is a note two",
        star: 4
      },
    ],
  },
  {
    name: 'To Kill A Mockingbird',
    year: '1960',
    reviews: [
      {
        email: 'johndoe@gmail.com',
        note: "This is a good one",
        star: 5
      },
      {
        email: 'janedoe@gmail.com',
        note: "This is a good two",
        star: 3
      },
    ],
  },
]