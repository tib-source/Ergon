import { ColumnDef } from "@/types.spec.ts";

export const approvalsColumns: ColumnDef[] = [
  {
    header: "ID",
    accessor: "id",
  },
  {
    header: "Requester",
    accessor: "userName",
  },
  {
    header: "Equipment",
    accessor: "equipment",
  },
  {
    header: "From",
    accessor: "bookedFrom",
  },
  {
    header: "To",
    accessor: "bookedTo",
  },
]