import React from "react";
import { eBoardState, IBoardData, RootState } from "../../types/types";
import { useSelector } from "react-redux";
import Alert from "@material-ui/lab/Alert";

import "./style.scss";

interface BoardDataProps {
  size: number;
}
export const BoardData: React.FunctionComponent<BoardDataProps> = (props) => {
  const data = useSelector<RootState, IBoardData>((state) => state.game.data);

  const renderMessage = () => {
    switch (data.step) {
      case eBoardState.Lose:
        return <Alert severity="error">Perdiste!</Alert>;
      case eBoardState.Win:
        return <Alert severity="success">Ganaste!</Alert>;
      default:
        return "";
    }
  };

  return (
    <div style={{ width: props.size * 30 + 2 }}>
      <div>{renderMessage()}</div>
      <div>
        {data.step !== eBoardState.Clean && (
          <Alert severity="info">
            {`Cantidad Bombas:${data.cantBombs - data.cantFlags}`}
          </Alert>
        )}
      </div>
    </div>
  );
};
