import React from 'react';

type DropdownProps = {
  options: string[];
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const Dropdown: React.FC<DropdownProps> = ({ options, placeholder, value, onChange }) => (
  <select
    className="border border-gray-300 rounded px-2 py-1"
    value={value}
    onChange={onChange}
  >
    <option disabled value="">{placeholder}</option>
    {options.map(opt => (
      <option key={opt} value={opt}>{opt}</option>
    ))}
  </select>
);

