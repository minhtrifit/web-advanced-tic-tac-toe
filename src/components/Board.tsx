import { useState, useEffect } from "react";

// Hooks
import { useMediaQuery } from "../hooks/myHooks";

// Components
import Square from "./Square";
import HistoryBoard from "./HistoryBoard";

// Types
import { History } from "../types/types";

const Board = () => {
  const [step, setStep] = useState<number>(1);
  const [history, setHistory] = useState<History[]>([]);
  const [winner, setWinner] = useState<string>("");
  const [nextPlayer, setNextPlayer] = useState<string>("O");
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [moveTurn, setMoveTurn] = useState<History[]>([]);

  useMediaQuery("(max-width: 600px)", setIsMobile);

  useEffect(() => {
    if (history.length !== 0) {
      calculateWinner(history);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history]);

  const handleSetHistory = (id: string, value: string) => {
    const data: History = {
      id: id,
      value: value,
    };

    setHistory([...(history !== undefined ? history : []), data]);
  };

  const getHistoryValueById = (
    history: History[],
    id: string
  ): string | boolean => {
    for (let i = 0; i < history.length; ++i) {
      if (history[i].id === id) {
        return history[i].value;
      }
    }
    return false;
  };

  const calculateWinner = (history: History[]) => {
    const lines = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 7],
      [1, 5, 9],
      [3, 5, 7],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];

      for (let j = 0; j < history.length; ++j) {
        if (
          history[j].id === a.toString() &&
          history[j]?.value === getHistoryValueById(history, b.toString()) &&
          history[j]?.value === getHistoryValueById(history, c.toString())
        ) {
          setWinner(history[j].value);
          alert(`Winner: ${history[j].value}`);
        }
      }
    }
  };

  const handleMoveToTurn = (index: number) => {
    setMoveTurn(history.slice(0, index + 1));
  };

  return (
    <div className="game" style={{ margin: "100px 0" }}>
      <div
        className="leader-board"
        style={{ border: "1px solid #000", padding: 10, width: "100%" }}
      >
        <p style={{ fontSize: "20px" }}>Turn: {step}</p>
        <p style={{ fontSize: "20px" }}>Next player: {nextPlayer}</p>
        <p style={{ fontSize: "20px", fontWeight: "bold", color: "red" }}>
          Winner: {winner}
        </p>
      </div>
      <div
        className="dashboard"
        style={{
          marginTop: "100px",
          width: "100%",
          display: "flex",
          flexDirection: !isMobile ? "row" : "column",
          alignItems: "flex-start",
          gap: 10,
        }}
      >
        <div className="main-board">
          <div style={{ display: "flex" }}>
            <Square
              id="1"
              step={step}
              setStep={setStep}
              handleSetHistory={handleSetHistory}
              winner={winner}
              setNextPlayer={setNextPlayer}
              moveTurn={moveTurn}
            />
            <Square
              id="2"
              step={step}
              setStep={setStep}
              handleSetHistory={handleSetHistory}
              winner={winner}
              setNextPlayer={setNextPlayer}
              moveTurn={moveTurn}
            />
            <Square
              id="3"
              step={step}
              setStep={setStep}
              handleSetHistory={handleSetHistory}
              winner={winner}
              setNextPlayer={setNextPlayer}
              moveTurn={moveTurn}
            />
          </div>
          <div style={{ display: "flex" }}>
            <Square
              id="4"
              step={step}
              setStep={setStep}
              handleSetHistory={handleSetHistory}
              winner={winner}
              setNextPlayer={setNextPlayer}
              moveTurn={moveTurn}
            />
            <Square
              id="5"
              step={step}
              setStep={setStep}
              handleSetHistory={handleSetHistory}
              winner={winner}
              setNextPlayer={setNextPlayer}
              moveTurn={moveTurn}
            />
            <Square
              id="6"
              step={step}
              setStep={setStep}
              handleSetHistory={handleSetHistory}
              winner={winner}
              setNextPlayer={setNextPlayer}
              moveTurn={moveTurn}
            />
          </div>
          <div style={{ display: "flex" }}>
            <Square
              id="7"
              step={step}
              setStep={setStep}
              handleSetHistory={handleSetHistory}
              winner={winner}
              setNextPlayer={setNextPlayer}
              moveTurn={moveTurn}
            />
            <Square
              id="8"
              step={step}
              setStep={setStep}
              handleSetHistory={handleSetHistory}
              winner={winner}
              setNextPlayer={setNextPlayer}
              moveTurn={moveTurn}
            />
            <Square
              id="9"
              step={step}
              setStep={setStep}
              handleSetHistory={handleSetHistory}
              winner={winner}
              setNextPlayer={setNextPlayer}
              moveTurn={moveTurn}
            />
          </div>
        </div>
        <HistoryBoard
          historyList={history}
          handleMoveToTurn={handleMoveToTurn}
        />
      </div>
    </div>
  );
};

export default Board;
