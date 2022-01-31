import { Box } from 'src/app/components/domain/domain';
import { lotList } from './getLotList';

export const box: Box = {
  id: 1,
  nextBoxId: 1,
  isClosed: false,
  workstationId: 1,
  lot: lotList[0],
  count: 1,
  dateIns: new Date(),
  dateClose: new Date(),
  countPercentage: 8,
  obuList: []
};

