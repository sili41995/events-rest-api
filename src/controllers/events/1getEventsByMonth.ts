import { Response, NextFunction } from 'express';
import { IRequest, IUser } from '../../types/types';
import { ErrorMessages } from '../../constants';
import { getIsValidDate, httpError } from '../../utils';

const getEventsByMonth = async (
  req: IRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { _id: owner } = req.user as IUser;
  const { month, year } = req.query;

  const isValidDate = getIsValidDate({
    year: Number(year),
    month: Number(month),
  });

  if (!isValidDate) {
    throw httpError({
      status: 400,
      message: ErrorMessages.invalidDateErr,
    });
  }
};

export default getEventsByMonth;
