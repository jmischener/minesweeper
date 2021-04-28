import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { boardReducer, initialState } from "../reducers/boardReducer";
import { eBoardState } from "../types/types";

const reducers = combineReducers({ game: boardReducer });

export const store = createStore(
  reducers,
  loadFromStorage(),
  composeWithDevTools()
);

store.subscribe(saveInStorage);

export function loadFromStorage() {
  try {
    const serializedData = localStorage.getItem("minesweeper");
    if (serializedData === null) return { game: initialState() };
    return JSON.parse(serializedData);
  } catch (error) {
    return initialState();
  }
}

function saveInStorage() {
  const state = store.getState();
  switch (state.game.data.step) {
    case eBoardState.Clean:
    case eBoardState.InGame:
      localStorage.setItem("minesweeper", JSON.stringify(store.getState()));
      break;
    case eBoardState.Lose:
    case eBoardState.Win:
      localStorage.removeItem("minesweeper");
      break;
  }
  localStorage.setItem("minesweeper", JSON.stringify(store.getState()));
}
