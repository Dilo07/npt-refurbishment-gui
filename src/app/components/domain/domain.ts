export class Batch {
  id: number;
  lotNumber: string;
  hardware: Hardware;
  boxNumber: number;
  boxSize: number;
  countOpenBox: number;
  countClosedBox: number;
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
}

export interface Workstation{
  id: number;
  description: string;
}
