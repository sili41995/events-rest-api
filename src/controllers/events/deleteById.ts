import { Response, NextFunction } from 'express';
import { IRequest, IUser } from '../../types/types';
import { Endpoints, FindFilters } from '../../constants';
import { Event } from '../../models/event';
import { ctrlWrapper, httpError } from '../../utils';

const deleteById = async (
  req: IRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { _id: owner } = req.user as IUser;
  const _id = req.params[Endpoints.dynamicId];

  const result = await Event.findOneAndDelete({ _id, owner }).select(
    FindFilters.eventFilter
  );

  if (!result) {
    throw httpError({ status: 404 });
  }

  res.status(200).json(result);
};

export default ctrlWrapper<IRequest>(deleteById);
