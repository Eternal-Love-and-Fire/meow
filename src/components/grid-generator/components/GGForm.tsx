import React from "react";
import { GGButton } from "./GGButton";
import { GGInput } from "./GGInput";

type GGFormProps = {
  handleSubmit: (e: React.FormEvent) => void;
  cols: number;
  rows: number;
  setCols: (value: number) => void;
  setRows: (value: number) => void;
  columnGap: number;
  setColumnGap: (value: number) => void;
  rowGap: number;
  setRowGap: (value: number) => void;
  resetForm: () => void;
};

const GGForm = ({
  handleSubmit,
  cols,
  rows,
  setCols,
  setRows,
  columnGap,
  setColumnGap,
  rowGap,
  setRowGap,
  resetForm,
}: GGFormProps) => {
  return (
    <form
      className="flex flex-col space-y-4 bg-transparent p-4 w-full max-w-sm"
      onSubmit={handleSubmit}
    >
      <GGInput
        label="Columns"
        value={cols}
        min={1}
        onChange={(e) => setCols(Number(e.target.value))}
      />
      <GGInput
        label="Rows"
        value={rows}
        min={1}
        onChange={(e) => setRows(Number(e.target.value))}
      />
      <GGInput
        label="Column Gap (in px)"
        value={columnGap}
        min={0}
        onChange={(e) => setColumnGap(Number(e.target.value))}
      />
      <GGInput
        label="Row Gap (in px)"
        value={rowGap}
        min={0}
        onChange={(e) => setRowGap(Number(e.target.value))}
      />
      <GGButton
        type="submit"
        className="mt-4 py-2 px-4 border border-teal-400 text-teal-400 rounded hover:bg-teal-400 hover:text-white transition-all"
      >
        Submit
      </GGButton>
      <GGButton
        handleClick={resetForm}
        type="button"
        className="mt-4 py-2 px-4 border border-gray-400 text-gray-400 rounded hover:bg-gray-400 hover:text-white transition-all"
      >
        Reset Grid
      </GGButton>
    </form>
  );
};

export { GGForm };
