import React from "react";

type GridCellProps = {
  row: number;
  col: number;
  isSelected: boolean;
  handleMouseDown: (row: number, col: number) => void;
};

const GridCell = ({ row, col, isSelected, handleMouseDown }: GridCellProps) => {
  return (
    <div
      className={`border border-black dark:border-white box-border ${isSelected ? "bg-blue-500" : ""}`}
      data-row={row}
      data-col={col}
      style={{
        gridRowStart: row + 1,
        gridColumnStart: col + 1,
      }}
      onMouseDown={() => handleMouseDown(row, col)}
    ></div>
  );
};

export { GridCell };
