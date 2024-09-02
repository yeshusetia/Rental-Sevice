import React from 'react';
import './chip.scss';

interface ChipProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const chip: React.FC<ChipProps> = ({ label, isActive, onClick }) => {
  return (
    <button
      className={`chip ${isActive ? 'active' : ''}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default chip;