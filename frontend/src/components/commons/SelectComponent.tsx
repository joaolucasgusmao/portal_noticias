import React from "react";

interface SelectComponentProps {
  label: string;
  value: number[];
  onChange: (value: number[]) => void;
  options: { id: number; name: string }[];
}

const SelectComponent: React.FC<SelectComponentProps> = ({
  label,
  value,
  onChange,
  options,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValues = Array.from(event.target.selectedOptions, (option) =>
      Number(option.value)
    );
    onChange(selectedValues);
  };

  return (
    <>
      <label
        className="text-[var(--gray)] font-medium text-base"
        htmlFor={label}
      >
        {label}
      </label>
      <select
        className="w-full h-12 p-2 rounded-xs text-[var(--gray)] bg-[var(--input-bg)] mb-4 mt-2 "
        id={label}
        onChange={handleChange}
        style={{
          borderRadius: "3px",
          border: "1px solid var(--input-border)",
          backgroundColor: "var(--black)",
          color: "var(--gray)",
        }}
      >
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </>
  );
};

export default SelectComponent;
