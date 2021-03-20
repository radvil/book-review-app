import { IBook } from "../_interfaces/book.interface";

export const books: Array<IBook> = [
  {
    name: 'Harry Potter',
    year: '2010',
    imageUrl: 'assets/covers/harry-potter.jpeg',
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
    createdAt: "2020-03-20T13:32:39.595Z"
  },
  {
    name: 'To Kill A Mockingbird',
    year: '1960',
    imageUrl: 'assets/covers/to-kill-a-mockingbird.jpeg',
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
    createdAt: "2018-03-20T10:22:39.595Z"
  },
]