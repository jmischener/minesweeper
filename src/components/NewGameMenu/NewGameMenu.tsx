import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import React, { FunctionComponent, useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { newBoard } from "../../actions/board";

import "./style.scss";

export const NewGameMenu: FunctionComponent = () => {
  const dispatch = useDispatch();

  const [visibleNewDialog, setVisibleNewDialog] = useState<boolean>(false);
  const [boardSize, setBoardSize] = useState<number>(0);
  const [cantBombs, setCantBombs] = useState<number>(0);
  const [disabled, setDisabled] = useState<boolean>(true);

  useEffect(() => {
    if (
      boardSize > 0 &&
      cantBombs > 0 &&
      cantBombs <= (boardSize * boardSize) / 2
    )
      setDisabled(false);
    else setDisabled(true);
  }, [boardSize, cantBombs]);

  const handleClickNewGame = () => {
    setVisibleNewDialog(true);
  };

  const handleCloseDialog = () => {
    setVisibleNewDialog(false);
  };

  const handleChangeBoardSize = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const size: number = Number.parseInt(e.target.value);
    setBoardSize(size);
  };

  const handleChangeCantBombs = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setCantBombs(Number.parseInt(e.target.value));
  };

  const handleInitNewGame = () => {
    dispatch(newBoard(boardSize, cantBombs));
    setVisibleNewDialog(false);
  };

  return (
    <div className="root">
      <Button variant="outlined" color="primary" onClick={handleClickNewGame}>
        Nueva Partida!
      </Button>

      <Dialog
        open={visibleNewDialog}
        onClose={handleCloseDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Nueva Partida</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Defina el tamaño del tablero y la cantidad de bombas
          </DialogContentText>
          <TextField
            id="boardSize"
            label="Tamaño Tablero"
            type="number"
            onChange={handleChangeBoardSize}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="cantBombs"
            label="Cantidad Bombas"
            type="number"
            onChange={(e) => {
              handleChangeCantBombs(e);
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancelar
          </Button>
          <Button
            onClick={handleInitNewGame}
            color="primary"
            disabled={disabled}
          >
            Iniciar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
