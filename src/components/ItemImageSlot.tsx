import React from 'react';

type ItemImageSlotProps = {
  label: string;
  onClick?: () => void;
};

export const ItemImageSlot: React.FC<ItemImageSlotProps> = ({ label, onClick }) => (
  <div
    className="w-24 h-24 bg-gray-400 text-white flex items-center justify-center rounded cursor-pointer"
    onClick={onClick}
  >
    {label}
  </div>
);

