import { useState, useEffect } from "react";

import { History, HistoryBoardProp } from "../types/types";

const HistoryBoard = (props: HistoryBoardProp) => {
  const { historyList, handleMoveToTurn } = props;

  const [sortValue, setSortValue] = useState<string>("ascending");
  const [reverseHistory, setReverseHistory] = useState<History[]>([]);

  useEffect(() => {
    if (sortValue === "descending") {
      const temp = historyList.reverse();
      setReverseHistory(temp);
    } else setReverseHistory(historyList);
  }, [sortValue, historyList, reverseHistory]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 15,
      }}
    >
      <p style={{ textAlign: "center", fontSize: "20px", fontWeight: "bold" }}>
        History Board
      </p>
      <div
        style={{ display: "flex", gap: 10 }}
        onChange={(e: any) => {
          setSortValue(e.target.value);
        }}
      >
        <input
          type="radio"
          value="ascending"
          name="sort"
          defaultChecked={sortValue === "ascending"}
        />
        Ascending
        <input
          type="radio"
          value="descending"
          name="sort"
          defaultChecked={sortValue === "descending"}
        />
        Descending
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 15,
          alignItems: "center",
        }}
      >
        {reverseHistory.length !== 0 &&
          reverseHistory.map((his, index) => {
            return (
              <button
                key={his.id}
                style={{
                  width: "180px",
                  fontSize: "20px",
                  backgroundColor: "orange",
                  padding: "10px 15px",
                  border: "3px solid green",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  handleMoveToTurn(index);
                }}
              >
                Move to turn #{his.turn}
              </button>
            );
          })}
      </div>
    </div>
  );
};

export default HistoryBoard;
