import { ObjectId } from 'mongoose';

export interface IHttpError {
  status: number;
  message?: string;
}

export interface IUser {
  // [key: string]: ObjectId | string | number | null | undefined;
  _id: ObjectId;
  email: string;
  password: string | undefined;
  token: string | null | undefined;
  avatar?: string;
  name?: string;
}

export interface IEvent {
  // [key: string]: ObjectId | string | boolean | undefined;
  _id: ObjectId;
  deadline: string;
  task: string;
  completed: boolean;
}

export interface IRegExp {
  [key: string]: RegExp;
}
