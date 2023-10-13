import { HistoryBoardProp } from "../types/types";

const HistoryBoard = (props: HistoryBoardProp) => {
  const { historyList, handleMoveToTurn } = props;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
      {historyList.length !== 0 &&
        historyList.map((his, index) => {
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
              }}
              onClick={() => {
                handleMoveToTurn(index);
              }}
            >
              Move to turn #{index + 1}
            </button>
          );
        })}
    </div>
  );
};

export default HistoryBoard;
