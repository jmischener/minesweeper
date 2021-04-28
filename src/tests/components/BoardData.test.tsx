import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { BoardData } from "../../components/BoardData/BoardData";

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

const loseState = {
  game: {
    board: {
      squares: [
        { isBomb: false, state: 0, value: 1 },
        { isBomb: false, state: 0, value: 1 },
        { isBomb: true, state: 1, value: 0 },
        { isBomb: false, state: 0, value: 1 },
      ],
      size: 2,
    },
    data: { step: 2, cantBombs: 1, cantFlags: 0, cantShow: 3 },
  },
};

const winState = {
  game: {
    board: {
      squares: [
        { isBomb: false, state: 1, value: 1 },
        { isBomb: false, state: 1, value: 1 },
        { isBomb: true, state: 0, value: 0 },
        { isBomb: false, state: 1, value: 1 },
      ],
      size: 2,
    },
    data: { step: 3, cantBombs: 1, cantFlags: 0, cantShow: 0 },
  },
};

describe("Testeo de Componente MineSweeper", () => {
  test("Debe mostrarse sin mensajes y con la información correcta", () => {
    let store = mockStore(() => initState);
    store.dispatch = jest.fn();

    const wrapper = mount(
      <Provider store={store}>
        <BoardData size={2} />
      </Provider>
    );

    expect(wrapper).toMatchSnapshot("BoardData-InGame");
  });

  test("Debe mostrarse mensaje de ganaste", () => {
    let store = mockStore(() => winState);
    store.dispatch = jest.fn();

    const wrapper = mount(
      <Provider store={store}>
        <BoardData size={2} />
      </Provider>
    );

    expect(wrapper).toMatchSnapshot("BoardData-Win");
  });

  test("Debe mostrarse mensaje de perdiste", () => {
    let store = mockStore(() => loseState);
    store.dispatch = jest.fn();

    const wrapper = mount(
      <Provider store={store}>
        <BoardData size={2} />
      </Provider>
    );

    expect(wrapper).toMatchSnapshot("BoardData-Lose");
  });
});

export {};
