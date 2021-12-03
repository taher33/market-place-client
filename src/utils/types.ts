import { Dispatch, SetStateAction } from "react";
import { Socket } from "socket.io-client";

export interface Messages {
  sender: string;
  reciever: string;
  content: string;
}
export interface User {
  profileImg?: String;
  People_I_follow: [string];
  People_that_follow_me: [string];
  email: string;
  _id: string;
  name: string;
  lastMessage?: "";
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

export interface State {
  user: User;
  setUser: Dispatch<
    SetStateAction<
      | {
          name: string;
          email: string;
          id: string;
          profileImg: string | undefined;
          People_I_follow: [string];
          People_that_follow_me: [string];
        }
      | undefined
    >
  >;
  socket: Socket;
}

export interface Response {
  status: "error" | "success";
  data: any;
}
