import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBoard } from "../../actions/board";
import {
  iSquareData,
  eSquareState,
  eBoardState,
  RootState,
} from "../../types/types";
import FlagIcon from "@material-ui/icons/Flag";
import BugReportIcon from "@material-ui/icons/BugReport";

import "./style.scss";

interface SquareProps {
  index: number;
}

const Square: React.FunctionComponent<SquareProps> = (props) => {
  const dispatch = useDispatch();

  const { index } = props;

  const step = useSelector<RootState, eBoardState>(
    (state) => state.game.data.step
  );

  const squareData = useSelector<RootState, iSquareData>(
    (state) => state.game.board.squares[index]
  );

  const changeSquareValue = (value: eSquareState) => {
    dispatch(updateBoard(index, value));
  };

  const fillBox = () => {
    switch (squareData.state) {
      case eSquareState.Flag:
        return <FlagIcon style={{ fontSize: 25 }} color="secondary" />;
      case eSquareState.Question:
        return <span>?</span>;
      case eSquareState.Show:
        if (squareData.isBomb) {
          return <BugReportIcon style={{ fontSize: 25 }} />;
        } else {
          if (squareData.value === 0) return <span>&nbsp;</span>;
          return (
            <span className={`value${squareData.value}`}>
              {squareData.value}
            </span>
          );
        }
      default:
        return <span>&nbsp;</span>;
    }
  };

  function leftClick() {
    if (
      step === eBoardState.InGame &&
      squareData.state !== eSquareState.Show &&
      squareData.state !== eSquareState.Flag
    )
      changeSquareValue(eSquareState.Show);
  }

  function rightClick() {
    if (step === eBoardState.InGame) {
      switch (squareData.state) {
        case eSquareState.Flag:
          changeSquareValue(eSquareState.Question);
          break;
        case eSquareState.Question:
          changeSquareValue(eSquareState.Hidden);
          break;
        case eSquareState.Hidden:
          changeSquareValue(eSquareState.Flag);
          break;
        default:
          break;
      }
    }
  }

  return (
    <div
      className={`box${squareData.state} ${
        step === eBoardState.InGame && squareData.state !== eSquareState.Show
          ? "enabled"
          : ""
      }`}
      onClick={(event: React.MouseEvent<HTMLDivElement>) => {
        leftClick();
      }}
      onAuxClick={(event: React.MouseEvent<HTMLDivElement>) => {
        rightClick();
      }}
    >
      {fillBox()}
    </div>
  );
};

export default Square;
