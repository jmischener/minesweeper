import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import Board from "../../components/Board/Board";
import { BoardData } from "../../components/BoardData/BoardData";
import { NewGameMenu } from "../../components/NewGameMenu/NewGameMenu";
import { IBoard, RootState } from "../../types/types";

import "./style.scss";

export const MineSweeper: FunctionComponent = () => {
  const board = useSelector<RootState, IBoard>((state) => state.game.board);

  return (
    <div>
      <NewGameMenu />
      <BoardData size={board.size} />
      <Board size={board.size} />
    </div>
  );
};
