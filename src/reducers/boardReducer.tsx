import { eBoardState, IGameData, types } from "../types/types";

export const boardReducer = (
  state: IGameData = initialState(),
  action: any
): IGameData => {
  switch (action.type) {
    case types.new:
      return {
        ...state,
        board: {
          size: action.payload.board.size,
          squares: [...action.payload.board.squares],
        },
        data: {
          step: action.payload.data.step,
          cantBombs: action.payload.data.cantBombs,
          cantFlags: action.payload.data.cantFlags,
          cantShow: action.payload.data.cantShow,
        },
      };

    case types.lose:
      return {
        ...state,
        board: {
          squares: action.payload.board.squares,
          size: state.board.size,
        },
        data: {
          step: eBoardState.Lose,
          cantBombs: state.data.cantBombs,
          cantFlags: state.data.cantFlags,
          cantShow: state.data.cantShow,
        },
      };

    case types.win:
      return {
        ...state,
        board: {
          squares: action.payload.board.squares,
          size: state.board.size,
        },
        data: {
          step: eBoardState.Win,
          cantBombs: action.payload.data.cantBombs,
          cantFlags: action.payload.data.cantFlags,
          cantShow: action.payload.data.cantShow,
        },
      };

    case types.update:
      return {
        ...state,
        board: {
          squares: action.payload.board.squares,
          size: state.board.size,
        },
        data: {
          step: state.data.step,
          cantBombs: action.payload.data.cantBombs,
          cantFlags: action.payload.data.cantFlags,
          cantShow: action.payload.data.cantShow,
        },
      };

    default:
      return { ...state };
  }
};

export const initialState = (): IGameData => {
  return {
    board: { squares: [], size: 0 },
    data: {
      step: eBoardState.Clean,
      cantBombs: 0,
      cantFlags: 0,
      cantShow: 0,
    },
  };
};
