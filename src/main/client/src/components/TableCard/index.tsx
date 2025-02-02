import React from 'react';

interface TableCardProps {
    rows?: string[];
    children?: React.ReactNode;
    style?: React.CSSProperties;
    fontSize?: number;
    className?: string;
}

const TableCard: React.FC<TableCardProps> = ({ rows, children, style, fontSize, className}) => {
    return (
        <tr className={className ? className : 'card'} style={style}>
        {rows && rows.map((row, index) => (
            <td style={{fontSize: `${fontSize}rem`}} key={index}>{row}</td>
        ))}
        {children}
        </tr>
    );
};

export default TableCard;