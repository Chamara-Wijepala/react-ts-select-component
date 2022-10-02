import { useState } from "react";
import clsx from "clsx";

export interface SelectOption {
  value: string;
  index: number;
}

interface SelectProps {
  multiple: boolean;
  placeholder: string;
  values?: SelectOption[] | null;
  onChange: (value: SelectOption[] | null) => void;
  options: SelectOption[];
}

function Select({
  multiple,
  placeholder,
  values,
  onChange,
  options,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      tabIndex={0}
      onBlur={() => setIsOpen(false)}
      onClick={() => setIsOpen(!isOpen)}
      className="select select-container"
    >
      <div className="select-values">
        {!values && <span className="placeholder">{placeholder}</span>}

        {multiple ? (
          values?.map((value) => (
            <button key={value.index} className="select-value-btn">
              {value.value} &times;
            </button>
          ))
        ) : (
          <span>{values && values[0].value}</span>
        )}
      </div>

      <div className="select-buttons">
        <button className="clear-btn">&times;</button>

        <span className="vertical-divider" />

        <button className="caret"></button>
      </div>

      <ul className={clsx("select-options select-container", isOpen && "show")}>
        {options.map((option) => (
          <li key={option.index}>{option.value}</li>
        ))}
      </ul>
    </div>
  );
}

export default Select;
