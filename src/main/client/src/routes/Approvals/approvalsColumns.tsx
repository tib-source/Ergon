import { ColumnDef } from "@/types.spec.ts";

export const approvalsColumns: ColumnDef[] = [
  {
    header: "User",
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
  {
    header: "Comment",
    accessor: "reason",
  }
]