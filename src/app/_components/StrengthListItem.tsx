import React from 'react';

interface StrengthListItemProps {
  id: string;
  strength: string;
  onEdit: () => void;
  onDelete: () => void;
}

const StrengthListItem: React.FC<StrengthListItemProps> = ({ id, strength, onEdit, onDelete }) => {
  return (
    <div key={id} style={{ marginBottom: '10px', borderBottom: '1px solid #ccc', padding: '10px' }}>
      <p>{strength}</p>
      <button onClick={onEdit}>Edit</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};

export default StrengthListItem;
