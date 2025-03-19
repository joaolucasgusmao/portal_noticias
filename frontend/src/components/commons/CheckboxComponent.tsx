import React, { useState, useEffect } from "react";

interface CheckboxProps {
  label: string;
  value: number[];
  onChange: (value: number[]) => void;
  options: { id: number; name: string }[];
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  value,
  onChange,
  options,
}) => {
  const [selected, setSelected] = useState<number[]>(value);

  useEffect(() => {
    setSelected(value);
  }, [value]);

  const handleChange = (id: number) => {
    let newValue: number[];
    if (selected.includes(id)) {
      newValue = selected.filter((v) => v !== id);
    } else {
      newValue = [...selected, id];
    }
    setSelected(newValue);
    onChange(newValue);
  };

  return (
    <div className="mt-4">
      <label className="text-[var(--gray)] text-base block mb-2">{label}</label>
      <div className="flex flex-wrap gap-5">
        {options.map((option) => {
          const isChecked = selected.includes(option.id);
          return (
            <label
              key={option.id}
              className="flex items-center hover:scale-105 gap-2 p-2 text-base rounded-md cursor-pointer transition-all duration-300 bg-[var(--black-3)] text-[var(--gray)]"
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => handleChange(option.id)}
                className="w-5 h-5 accent-[var(--primary)] transition-all duration-300 cursor-pointer"
              />
              <span>{option.name}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default Checkbox;
