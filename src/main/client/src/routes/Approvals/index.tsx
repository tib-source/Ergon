import Table from "@/components/Table";
import { useBookingList } from "@/hooks/useBookingList.tsx";
import { approvalsColumns } from "@/routes/Approvals/approvalsColumns.ts";
import Loading from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { CheckCircle, DivideSquare, XCircle } from "lucide-react";

export const Approvals = () => {


  const { isPending, data } = useBookingList()
  console.log(data)

  return (
    <div className="dashboard">
      <h1 className="dashboard__title">Approvals</h1>

      {isPending ? (
        <Loading />
      ) : (
        <Table rows={approvalsColumns} content={data?.data || []} openModal={() => { }}>
          {(rowData) => (
            <div className="flex justify-end gap-2">
              <Button size="sm" className="hover:bg-green-70 cursor-pointer success ">
                <CheckCircle className="h-4 w-4 mr-1" />
                Approve
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 cursor-pointer"
              >
                <XCircle className="h-4 w-4 mr-1" />
                Reject
              </Button>
            </div>
          )}
        </Table>
      )}


    </div>
  )
}