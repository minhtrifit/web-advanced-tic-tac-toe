import { useState, useEffect, useRef } from "react";

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
    winnerResult,
  } = props;

  const [value, setValue] = useState<string>("");
  const squareRef = useRef<any>(null);

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
      squareRef.current.style.backgroundColor = "";
      squareRef.current.style.color = "black";

      const historyValue: string = getValueById(moveTurn, id);

      if (historyValue !== "") setValue(historyValue);
      else setValue("");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moveTurn]);

  useEffect(() => {
    if (
      winnerResult.length !== 0 &&
      moveTurn.length + 1 === step &&
      winnerResult.includes(Number(id))
    ) {
      squareRef.current.style.backgroundColor = "green";
      squareRef.current.style.color = "white";
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moveTurn]);

  // useEffect(() => {
  //   if (moveTurn.length !== 0) {
  //     console.log(moveTurn[moveTurn.length - 1].value);
  //   }
  // }, [moveTurn]);

  useEffect(() => {
    if (winnerResult.length !== 0) {
      if (winnerResult.includes(Number(id))) {
        squareRef.current.style.backgroundColor = "green";
        squareRef.current.style.color = "white";
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [winnerResult]);

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
      ref={squareRef}
      id={id}
      className="square"
      style={{
        width: "100px",
        height: "100px",
        fontSize: "30px",
        fontWeight: "bold",
        cursor: "pointer",
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
