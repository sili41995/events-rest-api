import { IFilter, IGetFindFilterProps, IFindFilter } from '../types/types';

const getFindFilter = ({ owner, query }: IGetFindFilterProps): IFindFilter => {
  const { page = 1, limit = 10, completed } = query;
  const skip = (Number(page) - 1) * Number(limit);
  const findFilter: IFilter = { owner };

  if (completed === 'false' || completed === 'true') {
    findFilter.completed = completed;
  }

  return { skip, limit: Number(limit), findFilter };
};

export default getFindFilter;
