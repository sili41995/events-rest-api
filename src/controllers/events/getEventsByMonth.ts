import { Response, NextFunction } from 'express';
import { IRequest, IUser } from '../../types/types';
import { ErrorMessages } from '../../constants';
import { ctrlWrapper, getIsValidDate, httpError } from '../../utils';
import { getMatchByTimeStage, getSortByTimeStage } from './aggregationStages';
import { Event } from '../../models/event';

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

  const matchByTimeStage = getMatchByTimeStage({
    month: Number(month),
    year: Number(year),
    owner,
  });
  const sortByTimeStage = getSortByTimeStage();
  const result = await Event.aggregate([matchByTimeStage, sortByTimeStage]);

  res.status(200).json(result);
};

export default ctrlWrapper<IRequest>(getEventsByMonth);
