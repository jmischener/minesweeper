import { iSquareData, eSquareState } from "../types/types";

export const populateBoard = (
  size: number,
  cantBombs: number
): Array<iSquareData> => {
  let ret = Array.from(
    { length: size * size },
    () =>
      ({ isBomb: false, state: eSquareState.Hidden, value: 0 } as iSquareData)
  );
  if (size <= 0 || cantBombs <= 0) {
    throw new Error("Valores incorrectos");
  }
  if (cantBombs > (size * size) / 2) {
    throw new Error("Demasiadas bombas");
  }
  for (let i = 0; i < cantBombs; i++) {
    const number = Math.round(Math.random() * (size * size - 1));
    ret[number].isBomb ? i-- : insertBomb(ret, size, number);
  }

  return ret;
};

const insertBomb = (
  data: Array<iSquareData>,
  size: number,
  position: number
) => {
  const elem: iSquareData = data[position];
  elem.isBomb = true;

  //top
  if (position >= size) {
    data[position - size].value++;
    if ((position - size) % size !== 0) data[position - size - 1].value++;
    if ((position - size) % size !== size - 1)
      data[position - size + 1].value++;
  }

  // left / right
  if (position % size !== 0) data[position - 1].value++;
  if (position % size !== size - 1) data[position + 1].value++;

  // bottom
  if (position + size < size * size) {
    data[position + size].value++;
    if ((position + size) % size !== 0) data[position + size - 1].value++;
    if ((position + size) % size !== size - 1)
      data[position + size + 1].value++;
  }
};

export const ShowAround = (function () {
  let _data: Array<iSquareData> = [];
  let _size: number = 0;
  let _count: number = 0;

  function _setBoard(
    data: Array<iSquareData>,
    size: number,
    index: number
  ): number {
    _data = data;
    _size = size;
    _count = 0;

    _around(index);

    return _count;
  }
  function _around(index: number) {
    // si ya estaba visible, finaliza recursiva
    if (_data[index].state !== eSquareState.Hidden) return;

    // muestra square
    _data[index].state = eSquareState.Show;
    _count++;

    // si el valor es distinto a cero, finaliza recursiva
    if (_data[index].value !== 0) return;

    //top
    if (index >= _size) {
      _around(index - _size);
      if ((index - _size) % _size !== 0) _around(index - _size - 1);
      if ((index - _size) % _size !== _size - 1) _around(index - _size + 1);
    }

    // left / right
    if (index % _size !== 0) _around(index - 1);
    if (index % _size !== _size - 1) _around(index + 1);

    // bottom
    if (index + _size < _size * _size) {
      _around(index + _size);
      if ((index + _size) % _size !== 0) _around(index + _size - 1);
      if ((index + _size) % _size !== _size - 1) _around(index + _size + 1);
    }
  }
  return { around: _setBoard };
})();
