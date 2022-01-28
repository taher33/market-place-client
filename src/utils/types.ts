import { Dispatch, SetStateAction } from "react";
import { Socket } from "socket.io-client";

export interface Messages {
  sender: string;
  reciever: string;
  content: string;
  read: boolean;
}

export interface Notification {
  creator: User;
  body: string;
  read: boolean;
  type: "message" | "user action";
  _id: string;
}

export interface ChatUser {
  profileImg?: String;
  People_I_follow: string[];
  People_that_follow_me: string[];
  email: string;
  _id: string;
  name: string;
  connected: boolean;
}
export interface User {
  profileImg?: string;
  People_I_follow: string[];
  People_that_follow_me: string[];
  email: string;
  _id: string;
  name: string;
}
export interface Product {
  condition: String;
  saves: number;
  price: number;
  stock: number;
  pictures: string[];
  createdAt: string;
  rating: number;
  _id: string;
  description: string;
  seller: User;
  categorie: string;
  details: string;
  modifiedAt: string;
}

export interface Thread {
  client: ChatUser;
  lastMessage: Messages;
  connected?: boolean;
  _id: string;
  unreadMsg: number;
}

export interface State {
  user: User | undefined;
  setUser: Dispatch<SetStateAction<User | undefined>>;
  socket: Socket | undefined;
  setSocket: Dispatch<SetStateAction<Socket | undefined>>;
}

export interface Response {
  status: "error" | "success";
  data: any;
}
