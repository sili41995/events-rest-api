import { IGetIsValidDateProps } from '../types/types';

const getIsValidDate = ({ year, month }: IGetIsValidDateProps): boolean => {
  const validYear = !Number.isNaN(year);
  const validMonth = !Number.isNaN(month) && month > 0 && month <= 12;

  return validYear && validMonth;
};

export default getIsValidDate;
