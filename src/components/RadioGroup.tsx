import React from 'react';
import clsx from 'clsx';

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  labels?: { [key: string]: string };
}

const RadioGroup: React.FC<RadioGroupProps> = ({ options, value, onChange, labels }) => {
  return (
    <div className="flex flex-col space-y-2">
      {options.map((option) => (
        <label key={option.value} className="flex items-center space-x-2">
          <input
            type="radio"
            checked={value === option.value}
            onChange={() => onChange(option.value)}
            className="text-blue-500 focus:ring-2 ring-offset-2 ring-blue-500"
          />
          {labels ? labels[option.value] || option.label : option.label}
        </label>
      ))}
    </div>
  );
};

export default RadioGroup;