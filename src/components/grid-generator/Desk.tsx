"use client";

import { useState, useEffect } from "react";

interface IBlock {
  row: number;
  col: number;
}

const Desk = () => {
  const [rows, setRows] = useState<number>(3);
  const [cols, setCols] = useState<number>(3);

  const [rowSizes, setRowSizes] = useState<string[]>(Array(3).fill("1fr"));
  const [colSizes, setColSizes] = useState<string[]>(Array(3).fill("1fr"));

  const [columnGap, setColumnGap] = useState<number>(0);
  const [rowGap, setRowGap] = useState<number>(0);

  useEffect(() => {
    setRowSizes((prev) => {
      const newSizes = [...prev];
      if (rows > newSizes.length) {
        while (newSizes.length < rows) {
          newSizes.push("1fr");
        }
      } else if (rows < newSizes.length) {
        newSizes.length = rows;
      }
      return newSizes;
    });
  }, [rows]);

  useEffect(() => {
    setColSizes((prev) => {
      const newSizes = [...prev];
      if (cols > newSizes.length) {
        while (newSizes.length < cols) {
          newSizes.push("1fr");
        }
      } else if (cols < newSizes.length) {
        newSizes.length = cols;
      }
      return newSizes;
    });
  }, [cols]);

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      const target = event.target as HTMLDivElement;

      const row = target.getAttribute("data-row");
      const col = target.getAttribute("data-col");

      console.log(row, col)
    };

    const handleMouseUp = (event: MouseEvent) => {
      const target = event.target as HTMLDivElement;
      const row = target.getAttribute("data-row");
      const col = target.getAttribute("data-col");

      console.log(row, col)

    }

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp)
    return () => {
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, []);

  const handleSizeInput = (
    direction: "col" | "row",
    position: number,
    size: string
  ) => {
    if (direction === "col") {
      setColSizes((prev) => {
        const updated = [...prev];
        updated[position] = size || "1fr";
        return updated;
      });
    } else {
      setRowSizes((prev) => {
        const updated = [...prev];
        updated[position] = size || "1fr";
        return updated;
      });
    }
  };

  const blocks: IBlock[] = [];
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
    setColumnGap(0);
    setRowGap(0);
  };

  return (
    <div className="mt-32 flex gap-4">
      <div
        className="w-[60vw] h-[512px] grid border border-black dark:border-white box-border select-none"
        style={{
          gridTemplateRows: `50px ${rowSizes.join(" ")}`,
          gridTemplateColumns: `50px ${colSizes.join(" ")}`,
          columnGap: `${columnGap}px`,
          rowGap: `${rowGap}px`,
        }}
      >
        {blocks.map((block) => {
          if (block.row === 0 && block.col === 0) {
            return (
              <div
                key={`block-${block.row}-${block.col}`}
                className="border border-black dark:border-white bg-gray-200 dark:bg-gray-800"
              ></div>
            );
          }

          if (block.row === 0) {
            return (
              <input
                key={`col-${block.col}`}
                type="text"
                className="text-center border border-black dark:border-white bg-transparent box-border"
                style={{
                  minWidth: "5px",
                  gridRowStart: 1,
                  gridColumnStart: block.col + 1,
                }}
                placeholder="1fr"
                value={colSizes[block.col - 1]}
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
                className="text-center border border-black dark:border-white bg-transparent box-border"
                style={{
                  minWidth: "5px",
                  gridRowStart: block.row + 1,
                  gridColumnStart: 1,
                }}
                placeholder="1fr"
                value={rowSizes[block.row - 1]}
                onChange={(e) =>
                  handleSizeInput("row", block.row - 1, e.target.value)
                }
              />
            );
          }

          return (
            <div
              key={`cell-${block.row}-${block.col}`}
              className="border border-black dark:border-white box-border"
              data-row={block.row}
              data-col={block.col}
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
        <label className="flex justify-between items-center">
          <span className="text-white">Columns</span>
          <input
            type="number"
            min={1}
            value={cols}
            onChange={(e) => {
              const value = Number(e.target.value);
              if (value >= 1) {
                setCols(value);
              }
            }}
            className="w-16 h-8 text-center bg-transparent border border-gray-500 rounded text-white"
          />
        </label>
        <label className="flex justify-between items-center">
          <span className="text-white">Rows</span>
          <input
            type="number"
            min={1}
            value={rows}
            onChange={(e) => {
              const value = Number(e.target.value);
              if (value >= 1) {
                setRows(value);
              }
            }}
            className="w-16 h-8 text-center bg-transparent border border-gray-500 rounded text-white"
          />
        </label>
        <label className="flex justify-between items-center">
          <span className="text-white">
            Column Gap <span className="opacity-50">(in px)</span>
          </span>
          <input
            type="number"
            min={0}
            value={columnGap}
            onChange={(e) => setColumnGap(Number(e.target.value))}
            className="w-16 h-8 text-center bg-transparent border border-gray-500 rounded text-white"
          />
        </label>
        <label className="flex justify-between items-center">
          <span className="text-white">
            Row Gap <span className="opacity-50">(in px)</span>
          </span>
          <input
            type="number"
            min={0}
            value={rowGap}
            onChange={(e) => setRowGap(Number(e.target.value))}
            className="w-16 h-8 text-center bg-transparent border border-gray-500 rounded text-white"
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
          Reset Grid
        </button>
      </form>
    </div>
  );
};

export { Desk };
