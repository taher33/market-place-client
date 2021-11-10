export interface User {
  profileImg: String;
  People_I_follow: [string];
  People_that_follow_me: [string];
  email: string;
  _id: string;
  name: string;
}
export interface Product {
  condition: String;
  saves: number;
  price: number;
  stock: number;
  pictures: [string];
  createdAt: string;
  rating: number;
  _id: string;
  description: string;
  seller: User;
  categorie: string;
  details: string;
  modifiedAt: string;
}
