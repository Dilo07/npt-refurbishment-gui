export class Batch {
  id: number;
  lotNumber: string;
  hardware: Hardware;
  boxNumber: number;
  boxSize: number;
  countOpenBox: number;
  countOpenBoxPercentage: number;
  countClosedBox: number;
  countClosedBoxPercentage: number;
  dateIns: Date;
  dateClose: Date;
}

export enum Hardware {
  'all',
  'obu Go',
  'even x',
  'arianna II',
  'arianna I'
}

export interface Box {
  id: number;
  nextBoxId: number;
  isClosed: boolean;
  workstationId: number;
  lot: Batch;
  count: number;
  dateIns: Date;
  dateClose: Date;
  countPercentage: number;
}

export interface Workstation {
  id: number;
  description: string;
}

export class Obu {
  id: number;
  extendedObuId: string;
  iccId: string;
  dateIns: Date;
}
