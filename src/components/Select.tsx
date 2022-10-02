import { useState } from "react";
import clsx from "clsx";

export interface SelectOption {
  value: string;
  index: number;
}

interface SelectProps {
  multiple: boolean;
  placeholder: string;
  values: SelectOption[];
  onChange: (value: SelectOption[]) => void;
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

  function clearValues() {
    onChange([]);
  }

  function selectOption(option: SelectOption) {
    if (multiple) {
      values?.includes(option)
        ? onChange(values.filter((value) => value !== option))
        : onChange([...values, option]);
    } else {
      onChange([option]);
    }
  }

  function isOptionSelected(option: SelectOption) {
    if (values) return values.includes(option);
  }

  return (
    <div
      tabIndex={0}
      onBlur={() => setIsOpen(false)}
      onClick={() => setIsOpen(!isOpen)}
      className="select select-container"
    >
      <div className="select-values">
        {values.length === 0 && (
          <span className="placeholder">{placeholder}</span>
        )}

        {multiple ? (
          values?.map((value) => (
            <button
              key={value.index}
              onClick={(e) => {
                e.stopPropagation();
                selectOption(value);
              }}
              className="select-value-btn"
            >
              {value.value} &times;
            </button>
          ))
        ) : (
          <span>{values.length > 0 && values[0].value}</span>
        )}
      </div>

      <div className="select-buttons">
        <button
          onClick={(e) => {
            e.stopPropagation();
            clearValues();
          }}
          className="clear-btn"
        >
          &times;
        </button>

        <span className="vertical-divider" />

        <button className="caret"></button>
      </div>

      <ul className={clsx("select-options select-container", isOpen && "show")}>
        {options.map((option) => (
          <li
            key={option.index}
            onClick={(e) => {
              e.stopPropagation();
              selectOption(option);
              setIsOpen(false);
            }}
            className={clsx(isOptionSelected(option) && "selected")}
          >
            {option.value}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Select;
