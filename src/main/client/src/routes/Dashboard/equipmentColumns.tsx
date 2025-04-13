import { ColumnDef } from "@/types.spec.ts";

export const equipmentColumns:ColumnDef[] = [
  {
    header: "ID",
    accessor: "id",
  },
  {
    header: "Name",
    accessor: "name",
  },
  {
    header: "Type",
    accessor: "type",
  },
  {
    header: "Status",
    accessor: "status",
  },
  {
    header: "Location",
    accessor: "location",
  },
  {
    header: "Quantity",
    accessor: "quantity",
  },
  {
    header: "Comment",
    accessor: "comment",
  },
]