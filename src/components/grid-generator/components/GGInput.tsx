import React from "react";

type GGInputProps = {
  label: string;
  value: number;
  min?: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const GGInput = ({ label, value, min = 0, onChange }: GGInputProps) => {
  return (
    <label className="flex justify-between items-center">
      <span className="text-white">{label}</span>
      <input
        type="number"
        min={min}
        value={value}
        onChange={onChange}
        className="w-16 h-8 text-center bg-transparent border border-gray-500 rounded text-white"
      />
    </label>
  );
};

export { GGInput };
