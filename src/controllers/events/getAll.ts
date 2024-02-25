import { NextFunction, Response } from 'express';
import { IRequest, IUser } from '../../types/types';
import { FindFilters } from '../../constants';
import { Event } from '../../models/event';
import { ctrlWrapper, getFindFilter } from '../../utils';

const getAll = async (
  req: IRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { _id: owner } = req.user as IUser;
  const { skip, limit, findFilter } = getFindFilter({
    owner,
    query: req.query,
  });
  const result = await Event.find(findFilter, FindFilters.eventFilter, {
    skip,
    limit,
  });
  const count = await Event.find({ owner }).countDocuments();

  res.status(200).json({
    events: result,
    count,
  });
};

export default ctrlWrapper<IRequest>(getAll);
