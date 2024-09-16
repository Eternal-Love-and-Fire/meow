"use client";

import { useState, useEffect, useRef } from "react";

interface IBlock {
  row: number;
  col: number;
}

type SelectedDivType = {
  position: {
    rowStart: number;
    colStart: number;
    rowEnd: number;
    colEnd: number;
  };
  color: string;
  id: number;
};

const Desk = () => {
  const [rows, setRows] = useState<number>(3);
  const [cols, setCols] = useState<number>(3);

  const [rowSizes, setRowSizes] = useState<string[]>(Array(3).fill("1fr"));
  const [colSizes, setColSizes] = useState<string[]>(Array(3).fill("1fr"));

  const [columnGap, setColumnGap] = useState<number>(0);
  const [rowGap, setRowGap] = useState<number>(0);

  const [isSelecting, setIsSelecting] = useState<boolean>(false);
  const [startPos, setStartPos] = useState<{ row: number; col: number } | null>(null);
  const [endPos, setEndPos] = useState<{ row: number; col: number } | null>(null);
  const [selectedDivs, setSelectedDivs] = useState<SelectedDivType[]>([]);

  const [generatedCode, setGeneratedCode] = useState<string>("");

  const gridRef = useRef<HTMLDivElement>(null);

  const blocks: IBlock[] = [];
  for (let row = 1; row <= rows + 1; row++) {
    for (let col = 1; col <= cols + 1; col++) {
      blocks.push({ row, col });
    }
  }

  const getRandomColor = () => {
    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-red-500",
      "bg-yellow-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-teal-500",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!isSelecting || !startPos) return;

      const target = event.target as HTMLElement;
      const row = target.getAttribute("data-row");
      const col = target.getAttribute("data-col");

      if (row && col) {
        setEndPos({ row: parseInt(row), col: parseInt(col) });
      }
    };

    const handleMouseUp = () => {
      if (isSelecting && startPos && endPos) {
        const rowStart = Math.min(startPos.row, endPos.row);
        const rowEnd = Math.max(startPos.row, endPos.row);
        const colStart = Math.min(startPos.col, endPos.col);
        const colEnd = Math.max(startPos.col, endPos.col);

        // Check for overlapping selections
        const isOverlapping = selectedDivs.some(
          (div) =>
            !(rowEnd < div.position.rowStart ||
              rowStart > div.position.rowEnd ||
              colEnd < div.position.colStart ||
              colStart > div.position.colEnd)
        );

        if (!isOverlapping) {
          const newDiv: SelectedDivType = {
            position: {
              rowStart,
              colStart,
              rowEnd,
              colEnd,
            },
            color: getRandomColor(),
            id: selectedDivs.length + 1,
          };
          setSelectedDivs((prev) => [...prev, newDiv]);
        }

        setIsSelecting(false);
        setStartPos(null);
        setEndPos(null);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isSelecting, startPos, endPos, selectedDivs]);

  const handleMouseDown = (row: number, col: number) => {
    setIsSelecting(true);
    setStartPos({ row, col });
    setEndPos({ row, col });
  };

  const handleMouseEnter = (row: number, col: number) => {
    if (!isSelecting) return;
    setEndPos({ row, col });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let jsxCode = `<div className="grid `;
    jsxCode += `grid-rows-${rows} `;
    jsxCode += `grid-cols-${cols} `;
    jsxCode += `gap-${rowGap} `;
    jsxCode += `gap-${columnGap} ">\n`;

    selectedDivs.forEach((div) => {
      jsxCode += `  <div className="col-start-${div.position.colStart} col-end-${div.position.colEnd + 1} row-start-${div.position.rowStart} row-end-${div.position.rowEnd + 1} ${div.color}"></div>\n`;
    });

    jsxCode += `</div>`;

    setGeneratedCode(jsxCode);
  };

  const resetForm = () => {
    setRows(3);
    setCols(3);
    setRowSizes(Array(3).fill("1fr"));
    setColSizes(Array(3).fill("1fr"));
    setColumnGap(10);
    setRowGap(10);
    setSelectedDivs([]);
    setGeneratedCode("");
  };

  return (
    <div className="mt-32 flex flex-col md:flex-row gap-8 justify-center items-start">
      {/* Grid Container */}
      <div
        ref={gridRef}
        className="w-full md:w-[60vw] h-[512px] grid border border-black dark:border-white box-border select-none relative"
        style={{
          gridTemplateRows: `50px ${rowSizes.join(" ")}`,
          gridTemplateColumns: `50px ${colSizes.join(" ")}`,
          columnGap: `${columnGap}px`,
          rowGap: `${rowGap}px`,
        }}
      >
        {/* Header Cells */}
        {blocks.map((block) => {
          if (block.row === 1 && block.col === 1) {
            return (
              <div
                key={`block-${block.row}-${block.col}`}
                className="border border-black dark:border-white bg-gray-200 dark:bg-gray-800"
              ></div>
            );
          }

          if (block.row === 1) {
            return (
              <input
                key={`col-${block.col}`}
                type="text"
                className="text-center border border-black dark:border-white bg-transparent box-border w-full h-full text-xs p-0 m-0"
                style={{
                  gridRowStart: 1,
                  gridColumnStart: block.col,
                }}
                placeholder="1fr"
                value={colSizes[block.col - 1]}
                onChange={(e) =>
                  setColSizes((prev) => {
                    const updated = [...prev];
                    updated[block.col - 1] = e.target.value || "1fr";
                    return updated;
                  })
                }
              />
            );
          }

          if (block.col === 1) {
            return (
              <input
                key={`row-${block.row}`}
                type="text"
                className="text-center border border-black dark:border-white bg-transparent box-border w-full h-full text-xs p-0 m-0"
                style={{
                  gridRowStart: block.row,
                  gridColumnStart: 1,
                }}
                placeholder="1fr"
                value={rowSizes[block.row - 1]}
                onChange={(e) =>
                  setRowSizes((prev) => {
                    const updated = [...prev];
                    updated[block.row - 1] = e.target.value || "1fr";
                    return updated;
                  })
                }
              />
            );
          }

          // Calculate if the block is selected and assign color
          const isSelected = selectedDivs.some(
            (div) =>
              block.row >= div.position.rowStart &&
              block.row <= div.position.rowEnd &&
              block.col >= div.position.colStart &&
              block.col <= div.position.colEnd
          );
          const selectedDiv = selectedDivs.find(
            (div) =>
              block.row >= div.position.rowStart &&
              block.row <= div.position.rowEnd &&
              block.col >= div.position.colStart &&
              block.col <= div.position.colEnd
          );
          const color = selectedDiv ? selectedDiv.color : "";

          return (
            <div
              key={`cell-${block.row}-${block.col}`}
              className={`border border-black dark:border-white box-border ${isSelected ? color : ""} cursor-pointer`}
              data-row={block.row}
              data-col={block.col}
              style={{
                gridRowStart: block.row,
                gridColumnStart: block.col,
              }}
              onMouseDown={() => handleMouseDown(block.row, block.col)}
              onMouseEnter={() => handleMouseEnter(block.row, block.col)}
            ></div>
          );
        })}
      </div>

      {/* Form Container */}
      <form
        className="flex flex-col space-y-4 bg-transparent p-4 w-full max-w-sm"
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
                setColSizes(Array(value).fill("1fr"));
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
                setRowSizes(Array(value).fill("1fr"));
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
        <div className="flex flex-col space-y-2">
          <button
            type="submit"
            className="py-2 px-4 border border-teal-400 text-teal-400 rounded hover:bg-teal-400 hover:text-white transition-all"
          >
            Submit
          </button>
          <button
            type="button"
            className="py-2 px-4 border border-gray-400 text-gray-400 rounded hover:bg-gray-400 hover:text-white transition-all"
            onClick={resetForm}
          >
            Reset Grid
          </button>
        </div>

        {/* Display Generated Code */}
        {generatedCode && (
          <div className="mt-4 p-2 bg-gray-800 text-white rounded overflow-auto">
            <pre className="whitespace-pre-wrap">{generatedCode}</pre>
          </div>
        )}
      </form>
    </div>
  );
};

export { Desk };
