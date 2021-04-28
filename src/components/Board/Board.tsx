import React, { ReactNode } from "react";
import Square from "../Square/Square";
import "./style.scss";

interface BoardProps {
  size: number;
}

const Board: React.FunctionComponent<BoardProps> = (props) => {
  const { size } = props;

  const showTablero = () => {
    let ret = new Array<ReactNode>(size * size);
    for (let i = 0; i < ret.length; i++) {
      ret[i] = <Square key={i} index={i} />;
    }

    return ret;
  };

  return (
    <div
      className="board"
      style={{
        gridTemplateColumns: `repeat(${size}, 30px)`,
      }}
      onMouseDown={(e) => e.preventDefault()}
      onContextMenu={(e) => e.preventDefault()}
    >
      {size > 0 && showTablero()}
    </div>
  );
};

export default Board;
