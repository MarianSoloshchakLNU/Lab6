import {Direction} from './direction.enum';
import {GameFlat} from './game-flat';
import {ICoordinates} from './coordinates';
import {CellStateEnum} from './cell-state.enum';

export class Worker {
  public direction?: Direction;
  public currentPosition: ICoordinates = {x: 0, y: 0};
  public aim: ICoordinates = {x: 0, y: 0};

  get borderLeft() {
    return this.currentPosition.x === 0;
  }

  get borderRight() {
    return this.currentPosition.x === this.flat.config[0].length - 1;
  }

  get borderTop() {
    return this.currentPosition.y === 0;
  }

  get borderBelow() {
    return this.currentPosition.y === this.flat.config.length - 1;
  }

  get cellFrontIsFree(): boolean {
    switch (this.direction) {
      case Direction.xminus:
        return this.cellXYIsFree(this.currentPosition.x - 1, this.currentPosition.y);
      case Direction.xminusyminus:
        return this.cellXYIsFree(this.currentPosition.x - 1, this.currentPosition.y - 1);
      case Direction.yminus:
          return this.cellXYIsFree(this.currentPosition.x, this.currentPosition.y + 1);
      case Direction.xminusyplus:
        return this.cellXYIsFree(this.currentPosition.x - 1, this.currentPosition.y - 1);
      case Direction.xplus:
        return this.cellXYIsFree(this.currentPosition.x + 1, this.currentPosition.y);
      case Direction.xplusyminus:
        return this.cellXYIsFree(this.currentPosition.x + 1, this.currentPosition.y - 1);
      case Direction.xplusyplus:
        return this.cellXYIsFree(this.currentPosition.x + 1, this.currentPosition.y + 1);
      case Direction.yplus:
        return this.cellXYIsFree(this.currentPosition.x, this.currentPosition.y + 1);
      default:
        return false;
    }
  }

  get nextCell(): ICoordinates {
    switch (this.direction) {
      case Direction.xminus:
        return {x: this.currentPosition.x - 1, y: this.currentPosition.y};
      case Direction.xminusyminus:
        return {x: this.currentPosition.x - 1, y: this.currentPosition.y - 1};
      case Direction.yminus:
        return {x: this.currentPosition.x, y: this.currentPosition.y - 1};
      case Direction.xminusyplus:
        return {x: this.currentPosition.x - 1, y: this.currentPosition.y = 1};
      case Direction.xplus:
        return {x: this.currentPosition.x + 1, y: this.currentPosition.y};
      case Direction.xplusyminus:
        return {x: this.currentPosition.x + 1, y: this.currentPosition.y - 1};
      case Direction.xplusyplus:
        return {x: this.currentPosition.x + 1, y: this.currentPosition.y + 1};
      case Direction.yplus:
        return {x: this.currentPosition.x, y: this.currentPosition.y + 1};
      default:
        return {x: this.currentPosition.x, y: this.currentPosition.y};
    }
  }

  get completed(): boolean {
    return this.currentPosition.x === this.aim.x && this.currentPosition.y === this.aim.y;
  }

  constructor(public flat: GameFlat) {
    const startPosition = flat.getStartPosition();
    const finishPosition = flat.getFinishPosition();
    this.setPos(startPosition.x, startPosition.y);
    this.setAim(finishPosition.x, finishPosition.y);

    this.calcNextDirRight();
  }

  setPos(x: number, y: number) {
    this.currentPosition = {
      x,
      y
    };

    this.flat.config[y][x] = CellStateEnum.Visited;
  }

  setAim(x: number, y: number) {
    this.aim = {
      x,
      y
    };
  }

  setDir(dir: Direction) {
    this.direction = dir;
  }

  step1() {
    const nextCell = this.nextCell;

    if (this.cellXYIsFree(nextCell.x, nextCell.y)) {
      this.setPos(nextCell.x, nextCell.y);
    }
  }

  turnRight(angle: number) {

  }

  turnLeft(angle: number) {

  }

  calcNextDirRight() {
    console.log(Math.abs(this.aim.y - this.currentPosition.y))

    if (this.aim.x !== this.currentPosition.x) {
      if ((this.aim.x - this.currentPosition.x) >= Math.abs(this.aim.y - this.currentPosition.y)) {
        this.direction = Direction.xplus;
      } else if (this.aim.y < this.currentPosition.y){
        this.direction = Direction.xplusyminus;
      } else if (this.aim.y > this.currentPosition.y) {
        this.direction = Direction.xplusyplus;
      }
    } else {
      this.direction = this.aim.y > this.currentPosition.y ? Direction.yplus : Direction.yminus;
    }

    console.log('----');
    console.log(this.direction)
    console.log(this.nextCell);
    console.log(this.currentPosition);
    console.log(this.aim);
    console.log('----');
  }

  cellXYIsFree(x: number, y: number) {
    return this.flat.config[y][x] !== CellStateEnum.Disabled;
  }
}
