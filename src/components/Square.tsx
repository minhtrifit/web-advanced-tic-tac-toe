import { useState, useEffect } from "react";

import { SquarePropType } from "../types/types";

const Square = (props: SquarePropType) => {
  const {
    id,
    step,
    setStep,
    handleSetHistory,
    winner,
    setNextPlayer,
    moveTurn,
  } = props;

  const [value, setValue] = useState<string>("");

  const getValueById = (moveTurn: any[], id: string): string => {
    for (let i = 0; i < moveTurn.length; ++i) {
      if (moveTurn[i].id === id) {
        return moveTurn[i].value;
      }
    }
    return "";
  };

  useEffect(() => {
    if (moveTurn.length !== 0) {
      const historyValue: string = getValueById(moveTurn, id);

      if (historyValue !== "") setValue(historyValue);
      else setValue("");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moveTurn]);

  useEffect(() => {
    if (moveTurn.length !== 0) {
      console.log(moveTurn[moveTurn.length - 1].value);
    }
  }, [moveTurn]);

  const handleSquareClick = (setValue: any) => {
    if (winner === "") {
      if (step % 2 != 0 && value === "") {
        setValue("X");
        handleSetHistory(id, "X");
        setNextPlayer("X");
      } else if (step % 2 === 0 && value === "") {
        setValue("O");
        handleSetHistory(id, "O");
        setNextPlayer("O");
      }

      let tempStep: number = step;
      tempStep++;
      setStep(tempStep);
    }
  };

  return (
    <button
      id={id}
      className="square"
      style={{
        width: "100px",
        height: "100px",
        fontSize: "30px",
        fontWeight: "bold",
      }}
      onClick={() => {
        handleSquareClick(setValue);
      }}
    >
      {value}
    </button>
  );
};

export default Square;
