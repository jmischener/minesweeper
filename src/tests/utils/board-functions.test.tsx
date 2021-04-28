import { populateBoard } from "../../utils/board-functions";
describe("Testeo de funciones de board-functions", () => {
  test("Longitud correcta de board", () => {
    const board = populateBoard(2, 1);
    expect(board.length).toBe(4);
  });

  test("Cantidad de bombas correcta", () => {
    const board = populateBoard(3, 2);
    let bombs = board.filter((i) => i.isBomb);
    expect(bombs.length).toBe(2);
  });

  test("Cantidad erronea en la creación del tablero", () => {
    const t = () => {
      populateBoard(0, 0);
    };
    expect(t).toThrow("Valores incorrectos");
  });

  test("Cantidad de bombas supera el máximo", () => {
    const t = () => {
      populateBoard(3, 8);
    };
    expect(t).toThrow("Demasiadas bombas");
  });
});

export {};
