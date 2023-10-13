export const createMap = (size: number) => {
  const map = Array<any>(size).fill(null);

  for (let i = 0; i < size; ++i) {
    map[i] = i + 1;
  }

  //   console.log(map);
  return map;
};

export const handleInitId = (row: number, col: number) => {
  let indexRow = 1;

  for (let i = 1; i <= row; ++i) {
    for (let j = 1; j <= col; ++j) {
      if (indexRow === 1 && row === 1) {
        return col;
      } else if (indexRow == 2 && row === 2) {
        if (col === 1) return 4;
        if (col === 2) return 5;
        return 6;
      } else if (indexRow == 3 && row === 3) {
        if (col === 1) return 7;
        if (col === 2) return 8;
        return 9;
      }
    }
    indexRow++;
  }

  return "";
};
