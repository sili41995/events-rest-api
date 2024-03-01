import { PipelineStage } from 'mongoose';
import { IGetMatchByTimeStageProps } from '../../types/types';
import { getFinalDate } from '../../utils';

const getMatchByTimeStage = ({
  year,
  month,
  owner,
}: IGetMatchByTimeStageProps): PipelineStage => {
  const startDate =
    month === 1
      ? new Date(`${year - 1}-${12}`)
      : new Date(`${year}-${month - 1}`);
  const finalDate = getFinalDate({ month, year });

  return {
    $match: {
      owner,
      deadline: {
        $gte: startDate,
        $lte: finalDate,
      },
    },
  };
};

const getSortByTimeStage = (): PipelineStage => ({
  $sort: {
    deadline: 1,
  },
});

export { getMatchByTimeStage, getSortByTimeStage };
