import { Response, NextFunction } from 'express';
import { IEventsRequest, IUser } from '../../types/types';
import { Event } from '../../models/event';
import { ctrlWrapper } from '../../utils';

const add = async (
  req: IEventsRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { _id: owner } = req.user as IUser;

  const result = await Event.create({
    ...req.body,
    owner,
  });
  result.owner = undefined;

  res.status(201).json(result);
};

export default ctrlWrapper<IEventsRequest>(add);
