import React from 'react';

interface ImprovementListItemProps {
  id: string;
  improvement: string;
  onEdit: () => void;
  onDelete: () => void;
}

const ImprovementList: React.FC<ImprovementListItemProps> = ({ id, improvement, onEdit, onDelete }) => {
  return (
    <div key={id} style={{ marginBottom: '10px', borderBottom: '1px solid #ccc', padding: '10px' }}>
      <p>{improvement}</p>
      <button onClick={onEdit}>Edit</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};

export default ImprovementList;
