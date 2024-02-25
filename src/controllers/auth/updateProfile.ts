import { NextFunction, Response } from 'express';
import { IAuthRequest, IUser } from '../../types/types';
import { User } from '../../models/user';
import { ctrlWrapper, getHashPassword } from '../../utils';
import { FindFilters } from '../../constants';

const updateProfile = async (
  req: IAuthRequest,
  res: Response,
  next: NextFunction
) => {
  const { _id: id, password: currentPassword } = req.user as IUser;

  if (req.body.password && currentPassword) {
    const hashPassword = await getHashPassword({
      currentPassword,
      password: req.body.password,
      passwordOutdated: req.body.passwordOutdated,
    });
    req.body.password = hashPassword;
  }

  const result = await User.findByIdAndUpdate(id, req.body).select(
    FindFilters.userFilter
  );

  res.status(200).json(result);
};

export default ctrlWrapper<IAuthRequest>(updateProfile);
