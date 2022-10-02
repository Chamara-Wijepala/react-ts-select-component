export interface SelectOption {
  value: string;
  index: number;
}

interface SelectProps {
  multiple: boolean;
  values?: SelectOption[] | null;
  onChange: (value: SelectOption[] | null) => void;
  options: SelectOption[];
}

function Select({ multiple, values, onChange, options }: SelectProps) {
  return (
    <div className="select select-container">
      <div className="select-values">
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

      <ul className="select-options select-container">
        {options.map((option) => (
          <li key={option.index}>{option.value}</li>
        ))}
      </ul>
    </div>
  );
}

export default Select;
