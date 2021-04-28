export interface IGameData {
  board: IBoard;
  data: IBoardData;
}

export interface IBoardData {
  step: eBoardState;
  cantBombs: number;
  cantFlags: number;
  cantShow: number;
}

export interface IBoard {
  squares: Array<iSquareData>;
  size: number;
}

export interface iSquareData {
  isBomb: boolean;
  state: eSquareState;
  value: number;
}

export enum eBoardState {
  Clean = 0,
  InGame = 1,
  Lose = 2,
  Win = 3,
}

export enum eSquareState {
  Hidden = 0,
  Show = 1,
  Flag = 2,
  Question = 3,
}

export type BoardState = {
  board: IGameData;
};

export const types = {
  new: "New Board",
  lose: "The End",
  update: "Update Board",
  win: "The Champion",
  update1: "Prueba",
};

export type RootState = {
  game: IGameData;
};
