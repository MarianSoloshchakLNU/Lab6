import {CellStateEnum} from './cell-state.enum';

export class GameFlat {
  config: Array<Array<CellStateEnum>>;

  constructor(flatConfig: Array<Array<CellStateEnum>>) {
    this.config = JSON.parse(JSON.stringify(flatConfig))
  }
}
