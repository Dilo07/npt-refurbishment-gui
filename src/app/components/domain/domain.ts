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
