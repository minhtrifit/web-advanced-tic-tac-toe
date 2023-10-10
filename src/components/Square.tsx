import { useState } from "react";

import { SquarePropType } from "../types/types";

const Square = (props: SquarePropType) => {
  const { id, step, setStep, handleSetHistory, winner, setNextPlayer } = props;

  const [value, setValue] = useState<string>("");

  const handleSquareClick = (setValue: any) => {
    if (winner === "") {
      if (step % 2 != 0) {
        setValue("X");
        handleSetHistory(id, "X");
        setNextPlayer("X");
      } else {
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
