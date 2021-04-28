import { loadFromStorage } from "../store/store";
import { eBoardState, eSquareState, IGameData, types } from "../types/types";
import { populateBoard, ShowAround } from "../utils/board-functions";

export const newBoard = (size: number, cantBombs: number) => ({
  type: types.new,
  payload: {
    board: { size: size, squares: [...populateBoard(size, cantBombs)] },
    data: {
      step: eBoardState.InGame,
      cantBombs: cantBombs,
      cantFlags: 0,
      cantShow: size * size - cantBombs,
    },
  } as IGameData,
});

export const updateBoard = (index: number, state: eSquareState) => {
  const game = loadFromStorage().game;
  const squares = game.board.squares;
  const data = game.data;

  // lost
  if (state === eSquareState.Show && squares[index].isBomb) {
    squares[index].state = state;
    return {
      type: types.lose,
      payload: { board: { squares: squares }, data: data },
    };
  }

  // in game
  switch (state) {
    case eSquareState.Show:
      let count = 0;

      count = ShowAround.around(squares, game.board.size, index);
      data.cantShow -= count;
      break;

    case eSquareState.Flag:
      data.cantFlags += 1;
      squares[index].state = state;
      break;

    case eSquareState.Hidden:
    case eSquareState.Question:
      squares[index].state = state;
      break;
  }

  // win
  if (data.cantShow === 0) {
    return {
      type: types.win,
      payload: { board: { squares: squares }, data: data },
    };
  }

  return {
    type: types.update,
    payload: {
      board: { squares: squares },
      data: data,
    },
  };
};
