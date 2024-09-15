"use client";

import { useState } from "react";

interface IBlock {
  rows: number;
  cols: number;
  rowSizes: string[];
  colSizes: string[];
}

const Desk = () => {
  const [rows, setRows] = useState<number>(3);
  const [cols, setCols] = useState<number>(3);

  const [rowSizes, setRowSizes] = useState<string[]>(Array(3).fill("1fr"));
  const [colSizes, setColSizes] = useState<string[]>(Array(3).fill("1fr"));

  const handleSizeInput = (
    direction: "col" | "row",
    position: number,
    size: string
  ) => {
    if (direction === "col") {
      setColSizes((prev) => {
        const updated = [...prev];
        updated[position] = size;
        return updated;
      });
    } else if (direction === "row") {
      setRowSizes((prev) => {
        const updated = [...prev];
        updated[position] = size;
        return updated;
      });
    }
  };

  const blocks = [];

  // Generate grid blocks including inputs for row and column headers
  for (let row = 0; row <= rows; row++) {
    for (let col = 0; col <= cols; col++) {
      blocks.push({ row, col });
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("submit");
  };

  const resetForm = () => {
    setRows(3);
    setCols(3);
    setRowSizes(Array(3).fill("1fr"));
    setColSizes(Array(3).fill("1fr"));
  };

  return (
    <div className="mt-32 flex gap-4">
      <div
        className="w-[60vw] h-[512px] grid border border-black dark:border-white"
        style={{
          gridTemplateRows: `50px ${rowSizes.join(" ")}`,
          gridTemplateColumns: `50px ${colSizes.join(" ")}`,
        }}
      >
        {blocks.map((block, index) => {
          if (block.row === 0 && block.col === 0) {
            // Skip the top-left empty block
            return <div key={index}></div>;
          }

          if (block.row === 0) {
            return (
              <input
                key={`col-${block.col}`}
                type="text"
                className="text-center border border-black dark:border-white bg-transparent"
                style={{
                  gridRowStart: 1,
                  gridColumnStart: block.col + 1,
                }}
                placeholder="1fr"
                value={colSizes[block.col - 1] || ""}
                onChange={(e) =>
                  handleSizeInput("col", block.col - 1, e.target.value)
                }
              />
            );
          }

          if (block.col === 0) {
            return (
              <input
                key={`row-${block.row}`}
                type="text"
                className="text-center border border-black dark:border-white bg-transparent"
                style={{
                  gridRowStart: block.row + 1,
                  gridColumnStart: 1,
                }}
                placeholder="1fr"
                value={rowSizes[block.row - 1] || ""}
                onChange={(e) =>
                  handleSizeInput("row", block.row - 1, e.target.value)
                }
              />
            );
          }

          return (
            <div
              key={index}
              className="border border-black dark:border-white"
              style={{
                gridRowStart: block.row + 1,
                gridColumnStart: block.col + 1,
              }}
            ></div>
          );
        })}
      </div>
      <form
        className="flex flex-col space-y-4 bg-transparent p-4 w-64"
        onSubmit={handleSubmit}
      >
        <label className="flex justify-between">
          <span className="text-white">Columns</span>
          <input
            type="number"
            value={cols}
            onChange={(e) => setCols(Number(e.target.value))}
            placeholder="5"
            className="w-16 h-8 mt-2 text-center bg-transparent border border-gray-500 rounded text-white"
          />
        </label>
        <label className="flex justify-between">
          <span className="text-white">Rows</span>
          <input
            type="number"
            value={rows}
            onChange={(e) => setRows(Number(e.target.value))}
            placeholder="5"
            className="w-16 h-8 mt-2 text-center bg-transparent border border-gray-500 rounded text-white"
          />
        </label>
        <label className="flex justify-between">
          <span className="text-white">
            Column Gap <span className="opacity-50">(in px)</span>
          </span>
          <input
            type="number"
            placeholder="0"
            className="w-16 h-8 mt-2 text-center bg-transparent border border-gray-500 rounded text-white"
          />
        </label>
        <label className="flex justify-between">
          <span className="text-white">
            Row Gap <span className="opacity-50">(in px)</span>
          </span>
          <input
            type="number"
            placeholder="0"
            className="w-16 h-8 mt-2 text-center bg-transparent border border-gray-500 rounded text-white"
          />
        </label>

        <button
          type="submit"
          className="mt-4 py-2 px-4 border border-teal-400 text-teal-400 rounded hover:bg-teal-400 hover:text-white transition-all"
        >
          Submit
        </button>

        <button
          type="button"
          className="mt-4 py-2 px-4 border border-gray-400 text-gray-400 rounded hover:bg-gray-400 hover:text-white transition-all"
          onClick={resetForm}
        >
          Reset grid
        </button>
      </form>
    </div>
  );
};

export { Desk };
