import { MouseEvent, useEffect, useRef, useState } from "react";
import { Equipment } from "../../types.spec.ts";

const Table = ({
  content,
  openModal,
}: {
  content: Equipment[];
  openModal: (id: number) => void;
}) => {
  const rows = [
    "ID",
    "Name",
    "Quantity",
    "Type",
    "Location",
    "Status",
    "Comment",
  ];

  const [processed, setProcessed] = useState(content);

  const buttonRefs = useRef<Array<HTMLButtonElement>>([]);


  const sortTable = (row: string, direction: string): void => {
    row = row.toLowerCase();
    if (direction === "asc") {
      setProcessed(
        [...content].sort((a: Equipment, b: Equipment) => {
          if (a[row] > b[row]) return -1;
          else if (a[row] < b[row]) return 1;
          else return 0;
        }),
      );
    } else {
      setProcessed(() =>
        [...content].sort((a, b) => {
          if (a[row] < b[row]) return -1;
          else if (a[row] > b[row]) return 1;
          else return 0;
        }),
      );
    }
  };

  const resetButtons = (current: HTMLButtonElement) => {
    buttonRefs.current.map((button) => {
      if (button !== current) {
        button.removeAttribute("data-dir");
      }
    });
  };
  const handleSort = (event: MouseEvent<HTMLButtonElement>, row: string) => {
    const curr = event.currentTarget;
    resetButtons(event.currentTarget);
    if (curr.getAttribute("data-dir") === "desc") {
      // Handle sorting
      sortTable(row, "asc");
      curr.setAttribute("data-dir", "asc");
    } else {
      // Handle sorting
      sortTable(row, "desc");
      curr.setAttribute("data-dir", "desc");
    }
  };

  useEffect(() => {
    setProcessed([...content]);
  }, [content]);
  return (
    <table id="dashboard_table">
      <thead>
        <tr>
          {rows.map((row, index) => (
            <th key={index}>
              <button
                ref={(el) =>
                  (buttonRefs.current[index] = el as HTMLButtonElement)
                }
                onClick={(e) => handleSort(e, row)}
                className="table__row"
              >
                {row}
              </button>
            </th>
          ))}

          <th>Action</th>
        </tr>
      </thead>
      <tbody id="table_content">
        {processed.length === 0 && (
          <tr>
            <td className="empty"> No Results Found</td>
          </tr>
        )}
        {processed.map((row: Equipment, index: number) => (
          <tr key={index}>
            <td>{row.id}</td>
            <td>{row.name}</td>
            <td>{row.quantity}</td>
            <td>{row.type}</td>
            <td>{row.location}</td>
            <td>
              <span className={`status status__${row.status.toLowerCase()}`}>
                {row.status}
              </span>
            </td>
            <td>{row.comment == "nan" ? "" : row.comment}</td>
            <td>
              <button
                onClick={() => openModal(row.id)}
                className="styled__button"
              >
                Book
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
