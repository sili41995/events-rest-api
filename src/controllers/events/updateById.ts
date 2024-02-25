import { NextFunction, Response } from 'express';
import { IEventsRequest, IUser } from '../../types/types';
import { FindFilters } from '../../constants';
import { Event } from '../../models/event';
import { ctrlWrapper, httpError } from '../../utils';

const updateById = async (
  req: IEventsRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { _id: owner } = req.user as IUser;
  const { entryId: _id } = req.params;

  const result = await Event.findOneAndUpdate({ _id, owner }, req.body).select(
    FindFilters.eventFilter
  );

  if (!result) {
    throw httpError({ status: 404 });
  }

  res.status(200).json(result);
};

export default ctrlWrapper<IEventsRequest>(updateById);
