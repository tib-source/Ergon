import React, {
  MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { ColumnDef } from "@/types.spec.ts";

function Table<TData extends Record<string, any>>({
  rows,
  content,
  children,
}: {
  content: TData[];
  rows: ColumnDef[];
  openModal?: (id: number) => void;
  children?: ((rowData: TData) => React.ReactNode) | React.ReactElement<{ rowData: TData }>;
}) {
  const [processed, setProcessed] = useState<TData[]>(content);
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const sortTable = useCallback(
    (row: string, direction: string): void => {
      if (direction === "asc") {
        setProcessed(
          [...content].sort((a: TData, b: TData) => {
            if (a[row] > b[row]) return -1;
            else if (a[row] < b[row]) return 1;
            else return 0;
          }),
        );
      } else {
        setProcessed(() =>
          [...content].sort((a: TData, b: TData) => {
            if (a[row] < b[row]) return -1;
            else if (a[row] > b[row]) return 1;
            else return 0;
          }),
        );
      }
    },
    [content],
  );

  const resetButtons = (current: HTMLButtonElement) => {
    buttonRefs.current.forEach((button) => {
      if (button && button !== current) {
        button.removeAttribute("data-dir");
      }
    });
  };

  const handleSort = (event: MouseEvent<HTMLButtonElement>, row: ColumnDef) => {
    const curr = event.currentTarget;
    resetButtons(curr);
    if (curr.getAttribute("data-dir") === "desc") {
      sortTable(row.accessor, "asc");
      curr.setAttribute("data-dir", "asc");
    } else {
      sortTable(row.accessor, "desc");
      curr.setAttribute("data-dir", "desc");
    }
  };

  useEffect(() => {
    setProcessed([...content]);
    sortTable("ID", "des");
  }, [content, sortTable]);

  // Function to render action cell with row data
  const renderActionCell = (rowData: TData) => {
    if (!children) return null;

    if (typeof children === "function") {
      return children(rowData);
    }

    if (React.isValidElement(children)) {
      return React.cloneElement(children, { rowData } as { rowData: TData });
    }

    return children;
  };

  return (
    <table id="dashboard_table">
      <thead>
        <tr>
          {rows.map((row, index) => (
            <th key={index}>
              <button
                ref={(el) => (buttonRefs.current[index] = el)}
                onClick={(e) => handleSort(e, row)}
                className="table__row"
              >
                {row.header}
              </button>
            </th>
          ))}
          {children && <th>Action</th>}
        </tr>
      </thead>
      <tbody id="table_content">
        {processed.length === 0 && (
          <tr>
            <td className="empty" colSpan={rows.length + (children ? 1 : 0)}>
              No Results Found
            </td>
          </tr>
        )}
        {processed.map((rowData, index) => (
          <tr key={index}>
            {rows.map((row, cellIndex) => (
              <td key={cellIndex} >
                {row.cell ? row.cell : rowData[row.accessor]}
              </td>
            ))}
            {children && <td>{renderActionCell(rowData)}</td>}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
