import React from 'react';
import './chip.scss';

interface ChipProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const Chip: React.FC<ChipProps> = ({ label, isActive, onClick }) => {
  return (
    <button
      className={`chip ${isActive ? 'active' : ''}`}
      onClick={onClick}
      disabled={isActive} // Optionally disable interaction if active
    >
      {label}
    </button>
  );
};

export default Chip;
