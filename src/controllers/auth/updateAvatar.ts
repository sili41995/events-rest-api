import { NextFunction, Response } from 'express';
import { IRequest, IUser } from '../../types/types';
import { User } from '../../models/user';
import {
  ctrlWrapper,
  updateImage,
  getImageFilename,
  httpError,
} from '../../utils';
import { ErrorMessages, ProfileSettings } from '../../constants';

const updateAvatar = async (
  req: IRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (!req.file) {
    throw httpError({ status: 404, message: ErrorMessages.missingFileErr });
  }

  if (!req.user) {
    throw httpError({ status: 401 });
  }

  const { path } = req.file;
  const { _id: id } = req.user;
  const avatar = req.user[ProfileSettings.imgField];
  const filename = getImageFilename(avatar);
  const { url: avatarURL } = await updateImage({
    path,
    filename,
  });
  const result = (await User.findByIdAndUpdate(id, {
    avatar: avatarURL,
  })) as IUser;

  res.status(200).json({ avatar: result.avatar });
};

export default ctrlWrapper<IRequest>(updateAvatar);
