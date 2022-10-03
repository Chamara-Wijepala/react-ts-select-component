import { useRef, useState } from "react";
import clsx from "clsx";

export interface SelectOption {
  value: string;
  index: number;
}

interface SelectProps {
  multiple?: boolean;
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
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

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

  function handleKeyboardNavigation(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.target !== containerRef.current) return;

    switch (e.code) {
      case "Enter":
      case "Space":
        e.preventDefault();
        setIsOpen((prev) => !prev);
        if (isOpen) selectOption(options[highlightedIndex]);
        break;

      case "ArrowUp":
      case "ArrowDown": {
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          break;
        }
        const newValue = highlightedIndex + (e.code === "ArrowDown" ? 1 : -1);
        if (newValue >= 0 && newValue < options.length) {
          setHighlightedIndex(newValue);
        }
        break;
      }

      case "Escape":
        setIsOpen(false);
        break;
    }
  }

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onBlur={() => setIsOpen(false)}
      onClick={() => setIsOpen(!isOpen)}
      onKeyDown={(e) => handleKeyboardNavigation(e)}
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

        <div className="caret"></div>
      </div>

      <ul className={clsx("select-options select-container", isOpen && "show")}>
        {options.map((option, index) => (
          <li
            key={option.index}
            onMouseEnter={() => setHighlightedIndex(index)}
            onClick={(e) => {
              e.stopPropagation();
              selectOption(option);
              setIsOpen(false);
            }}
            className={clsx(
              isOptionSelected(option) && "selected",
              highlightedIndex === index && "highlighted"
            )}
          >
            {option.value}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Select;
