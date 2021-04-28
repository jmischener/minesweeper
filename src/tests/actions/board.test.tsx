import configureStore from "redux-mock-store";
import { newBoard, updateBoard } from "../../actions/board";
import { eBoardState, eSquareState, types } from "../../types/types";

import "@testing-library/jest-dom";

const mockStore = configureStore();

const initState = {
  game: {
    board: {
      squares: [
        { isBomb: false, state: 0, value: 1 },
        { isBomb: false, state: 0, value: 1 },
        { isBomb: true, state: 0, value: 0 },
        { isBomb: false, state: 0, value: 1 },
      ],
      size: 2,
    },
    data: { step: 1, cantBombs: 1, cantFlags: 0, cantShow: 3 },
  },
};
let store = mockStore(() => initState);

describe("Testeo de Redux actions de board", () => {
  const size = 2;
  const bombs = 1;

  test("Crea tablero - Valida Type y Payload", () => {
    store.dispatch(newBoard(size, bombs));
    const boardNew = store.getActions()[0];

    expect(boardNew.type).toEqual(types.new);

    expect(boardNew.payload.data).toEqual({
      step: eBoardState.InGame,
      cantBombs: bombs,
      cantFlags: 0,
      cantShow: size * size - bombs,
    });
  });

  test("Actualizar tablero - Update - Valida Payload", () => {
    localStorage.setItem("minesweeper", JSON.stringify(initState));

    store.dispatch(updateBoard(0, eSquareState.Show));
    const update = store.getActions()[1];

    expect(update).toEqual({
      type: types.update,
      payload: {
        board: {
          squares: [
            { isBomb: false, state: 1, value: 1 },
            { isBomb: false, state: 0, value: 1 },
            { isBomb: true, state: 0, value: 0 },
            { isBomb: false, state: 0, value: 1 },
          ],
        },
        data: { step: 1, cantBombs: 1, cantFlags: 0, cantShow: 2 },
      },
    });
  });

  test("Actualizar tablero - Win - Valida Payload", () => {
    const winState = {
      game: {
        board: {
          squares: [
            { isBomb: false, state: 1, value: 1 },
            { isBomb: false, state: 1, value: 1 },
            { isBomb: true, state: 0, value: 0 },
            { isBomb: false, state: 0, value: 1 },
          ],
          size: 2,
        },
        data: { step: 1, cantBombs: 1, cantFlags: 0, cantShow: 1 },
      },
    };

    localStorage.setItem("minesweeper", JSON.stringify(winState));

    store.dispatch(updateBoard(3, eSquareState.Show));
    const update = store.getActions()[2];

    expect(update).toEqual({
      type: types.win,
      payload: {
        board: {
          squares: [
            { isBomb: false, state: 1, value: 1 },
            { isBomb: false, state: 1, value: 1 },
            { isBomb: true, state: 0, value: 0 },
            { isBomb: false, state: 1, value: 1 },
          ],
        },
        data: { step: 1, cantBombs: 1, cantFlags: 0, cantShow: 0 },
      },
    });
  });

  test("Actualizar tablero - Lose - Valida Payload", () => {
    localStorage.setItem("minesweeper", JSON.stringify(initState));

    store.dispatch(updateBoard(2, eSquareState.Show));
    const update = store.getActions()[3];

    expect(update).toEqual({
      type: types.lose,
      payload: {
        board: {
          squares: [
            { isBomb: false, state: 0, value: 1 },
            { isBomb: false, state: 0, value: 1 },
            { isBomb: true, state: 1, value: 0 },
            { isBomb: false, state: 0, value: 1 },
          ],
        },
        data: { step: 1, cantBombs: 1, cantFlags: 0, cantShow: 3 },
      },
    });
  });
});

export {};
