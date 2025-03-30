import React from "react";
import "../styling/generic_table.css";

interface CardGridProps {
  children: React.ReactNode;
}

const CardGrid: React.FC<CardGridProps> = ({ children }) => {
  return (
    <div className="card-grid">
      {children}
    </div>
  );
};

export default CardGrid;