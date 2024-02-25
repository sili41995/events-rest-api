import bcrypt from 'bcryptjs';
import httpError from './httpError';
import { IUpdatePasswordProps } from '../types/types';
import { ErrorMessages } from '../constants';

const getHashPassword = async ({
  currentPassword,
  passwordOutdated = '',
  password,
}: IUpdatePasswordProps): Promise<string> => {
  const isValidOutdatedPassword = await bcrypt.compare(
    passwordOutdated,
    currentPassword
  );

  if (!isValidOutdatedPassword) {
    throw httpError({ status: 400, message: ErrorMessages.wrongPasswordErr });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  return hashPassword;
};

export default getHashPassword;
