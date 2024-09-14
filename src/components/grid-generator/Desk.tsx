"use client";

import { useState } from "react";

interface IBlock {
  rows: number;
  cols: number;
  rowSizes: string[];
  colSizes: string[];
}

const Desk = () => {
  const [rows, setRows] = useState<number>(4);
  const [cols, setCols] = useState<number>(4);

  const blocks = [];

  for (let row = 1; row <= rows; row++) {
    for (let col = 1; col <= cols; col++) {
      blocks.push({ row, col });
    }
  }

  const handleSubmit = () => {
    console.log("submit");
  };

  const resetForm = () => {
    console.log("reset");
  };
  return (
    <div className="mt-32 flex gap-4">
      <div
        className="w-[60vw] h-[512px] grid border border-black dark:border-white"
        style={{
          gridTemplateRows: `repeat(${rows}, 1fr)`,
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
        }}
      >
        {blocks.map((block, index) => {
          if (block.row === 1 && block.col === 1) {
            return (
              <div
                key={index}
                className="relative border border-black dark:border-white"
              >
                <input
                  type="text"
                  className="w-16 h-12 absolute left-1/2 bottom-[105%] translate-x-[-50%] text-center border border-blck dark:border-white bg-transparent"
                  placeholder="1fr"
                />
                <input
                  type="text"
                  className="w-16 h-12 absolute top-1/2 right-[95%] translate-x-[-50%] translate-y-[-50%] text-center border border-blck dark:border-white bg-transparent"
                  placeholder="1fr"
                />
              </div>
            );
          }

          if (block.row === 1) {
            return (
              <div
                key={index}
                className="relative border border-black dark:border-white"
              >
                <input
                  type="text"
                  className="w-16 h-12 absolute left-1/2 bottom-[105%] translate-x-[-50%] text-center border border-blck dark:border-white bg-transparent"
                  placeholder="1fr"
                />
              </div>
            );
          }

          if (block.col === 1) {
            return (
              <div
                key={index}
                className="relative border border-black dark:border-white"
              >
                <input
                  type="text"
                  className="w-16 h-12 absolute top-1/2 right-[95%] translate-x-[-50%] translate-y-[-50%] text-center border border-blck dark:border-white bg-transparent"
                  placeholder="1fr"
                />
              </div>
            );
          }

          return (
            <div
              key={index}
              className="border border-black dark:border-white"
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
            placeholder="5"
            className="w-16 h-8 mt-2 text-center bg-transparent border border-gray-500 rounded text-white"
          />
        </label>
        <label className="flex justify-between">
          <span className="text-white">Rows</span>
          <input
            type="number"
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
          Please may I have some code
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
