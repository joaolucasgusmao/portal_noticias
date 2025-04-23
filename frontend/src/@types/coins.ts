interface IDol {
  ask: string;
  pctChange: string;
}

interface IEur {
  ask: string;
  pctChange: string;
}

interface IBit {
  ask: string;
  pctChange: string;
}

export interface ICoins {
  USDBRL: IDol;
  EURBRL: IEur;
  BTCBRL: IBit;
}
