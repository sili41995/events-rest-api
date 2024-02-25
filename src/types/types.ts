import { ObjectId } from 'mongoose';
import { Request } from 'express';

export type MulterFile = Express.Multer.File;

export type MulterCB = (error: any, acceptFile?: boolean) => void;

export interface IHttpError {
  status: number;
  message?: string;
}

export interface IUser {
  // [key: string]: ObjectId | string | number | null | undefined;
  _id: ObjectId;
  email: string;
  password: string | undefined;
  passwordOutdated?: string;
  token: string | null | undefined;
  avatar: string;
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

export interface IRequest extends Request {
  user?: IUser;
  file?: MulterFile;
}

export interface IAuthRequest extends IRequest {
  body: IUser;
}

export interface IDecodedToken {
  id: string;
}

export interface IUpdateImageProps {
  path: string;
  filename: string;
}

export interface IErrorMessageList {
  [key: number]: string;
}

export interface IUpdatePasswordProps {
  currentPassword: string;
  password: string;
  passwordOutdated: string | undefined;
}
