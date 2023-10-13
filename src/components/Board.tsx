import { useState, useEffect } from "react";

// Hooks
import { useMediaQuery } from "../hooks/myHooks";

// Components
import Square from "./Square";
import HistoryBoard from "./HistoryBoard";

// Types
import { History } from "../types/types";

// Helper
import { createMap, handleInitId } from "../helpers/helper";

const Board = () => {
  const mapRow: number[] = createMap(3);
  const mapCol: number[] = createMap(3);

  const [step, setStep] = useState<number>(1);
  const [history, setHistory] = useState<History[]>([]);
  const [winner, setWinner] = useState<string>("");
  const [winnerResult, setWinnerResult] = useState<number[]>([]);
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
      turn: (history.length + 1).toString(),
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

  const calculateWinner = (history: History[]): boolean => {
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
          setWinnerResult(lines[i]);
          setWinner(history[j].value);
          alert(`Winner: ${history[j].value}`);
          return true;
        }

        if (j === 8) {
          setWinner("Draw");
          alert("Draw");
          return false;
        }
      }
    }

    return false;
  };

  const handleMoveToTurn = (index: number) => {
    setMoveTurn(history.slice(0, index + 1));
  };

  return (
    <div className="game" style={{ margin: "100px 0" }}>
      <div
        className="leader-board"
        style={{
          border: "3px solid #a87625",
          borderRadius: 5,
          width: "100%",
          minHeight: "100px",
          padding: "20px",
          backgroundColor: "#d4bd39",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <p style={{ fontSize: "20px", backgroundColor: "#d4bd39" }}>
          You are at move #{step}
        </p>
        <p style={{ fontSize: "20px", backgroundColor: "#d4bd39" }}>
          Next player: {nextPlayer}
        </p>
        <p
          style={{
            fontSize: "20px",
            backgroundColor: "#d4bd39",
            fontWeight: "bold",
            color: "green",
          }}
        >
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
          gap: 30,
        }}
      >
        <div id="main-board">
          {/* <div id="row-1" style={{ display: "flex" }}>
            <Square
              id="1"
              step={step}
              setStep={setStep}
              handleSetHistory={handleSetHistory}
              winner={winner}
              setNextPlayer={setNextPlayer}
              moveTurn={moveTurn}
              winnerResult={winnerResult}
            />
            <Square
              id="2"
              step={step}
              setStep={setStep}
              handleSetHistory={handleSetHistory}
              winner={winner}
              setNextPlayer={setNextPlayer}
              moveTurn={moveTurn}
              winnerResult={winnerResult}
            />
            <Square
              id="3"
              step={step}
              setStep={setStep}
              handleSetHistory={handleSetHistory}
              winner={winner}
              setNextPlayer={setNextPlayer}
              moveTurn={moveTurn}
              winnerResult={winnerResult}
            />
          </div>
          <div id="row-2" style={{ display: "flex" }}>
            <Square
              id="4"
              step={step}
              setStep={setStep}
              handleSetHistory={handleSetHistory}
              winner={winner}
              setNextPlayer={setNextPlayer}
              moveTurn={moveTurn}
              winnerResult={winnerResult}
            />
            <Square
              id="5"
              step={step}
              setStep={setStep}
              handleSetHistory={handleSetHistory}
              winner={winner}
              setNextPlayer={setNextPlayer}
              moveTurn={moveTurn}
              winnerResult={winnerResult}
            />
            <Square
              id="6"
              step={step}
              setStep={setStep}
              handleSetHistory={handleSetHistory}
              winner={winner}
              setNextPlayer={setNextPlayer}
              moveTurn={moveTurn}
              winnerResult={winnerResult}
            />
          </div>
          <div id="row-3" style={{ display: "flex" }}>
            <Square
              id="7"
              step={step}
              setStep={setStep}
              handleSetHistory={handleSetHistory}
              winner={winner}
              setNextPlayer={setNextPlayer}
              moveTurn={moveTurn}
              winnerResult={winnerResult}
            />
            <Square
              id="8"
              step={step}
              setStep={setStep}
              handleSetHistory={handleSetHistory}
              winner={winner}
              setNextPlayer={setNextPlayer}
              moveTurn={moveTurn}
              winnerResult={winnerResult}
            />
            <Square
              id="9"
              step={step}
              setStep={setStep}
              handleSetHistory={handleSetHistory}
              winner={winner}
              setNextPlayer={setNextPlayer}
              moveTurn={moveTurn}
              winnerResult={winnerResult}
            />
          </div> */}
          {mapRow.map((row) => {
            return (
              <div
                key={`row-${row}`}
                id={`row-${row}`}
                style={{ display: "flex" }}
              >
                {mapCol.map((col) => {
                  const targetId: any = handleInitId(row, col)?.toString();

                  // console.log(targetId);

                  return (
                    <Square
                      key={`row-col-${row * col}`}
                      id={targetId !== undefined && targetId}
                      step={step}
                      setStep={setStep}
                      handleSetHistory={handleSetHistory}
                      winner={winner}
                      setNextPlayer={setNextPlayer}
                      moveTurn={moveTurn}
                      winnerResult={winnerResult}
                    />
                  );
                })}
              </div>
            );
          })}
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
