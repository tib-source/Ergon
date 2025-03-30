import React, { ReactNode } from "react";
import "../styling/generic_table.css";

interface CardProps {
  children: ReactNode;
  footer?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, onClick, style, className }) => {
  return (
    <div className={`card-grid-item ${className}`} style={style} onClick={onClick}>
      {children}
    </div>
  );
};

export default Card;