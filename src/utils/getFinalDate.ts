import { IGetFinalDate } from '../types/types';

const getFinalDate = ({ month, year }: IGetFinalDate): Date => {
  const date = new Date();
  const timezoneOffset = date.getTimezoneOffset() / 60;
  const finalDate =
    month === 12
      ? new Date(`${year + 1}-1-31`)
      : new Date(`${year}-${month + 1}-31`);
  const hours = finalDate.getHours();
  finalDate.setHours(hours - timezoneOffset);

  return finalDate;
};

export default getFinalDate;
