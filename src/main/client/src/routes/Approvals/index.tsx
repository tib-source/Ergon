import Table from "@/components/Table";
import { useBookingList } from "@/hooks/useBookingList.tsx";
import { approvalsColumns } from "@/routes/Approvals/approvalsColumns.tsx";
import Loading from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";
import { useAuthorizedClient } from "@/hooks/useAuthorizedClient/useAuthorizedClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const Approvals = () => {
  const queryClient = useQueryClient();
  const client = useAuthorizedClient();
  const { isPending, data } = useBookingList()

  const { mutate: approvalMutate, isPending: approvalPending } = useMutation({
    mutationFn: ({ bookingId }: { bookingId: number }) => handleApprove(bookingId),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["bookings", "history"] }) },
  })

  const { mutate: rejectMutate, isPending: rejectionPending } = useMutation({
    mutationFn: ({ bookingId }: { bookingId: number }) => handleReject(bookingId),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["bookings", "history"] }) },
  })

  const handleApprove = async (bookingId: number) => {
    return client.post(`/bookings/${bookingId}/approve`);
  }


  const handleReject = async (bookingId: number) => {
    return client.post(`/bookings/${bookingId}/reject`);
  }
  return (
    <div className="dashboard">
      <h1 className="dashboard__title">Approvals</h1>

      {isPending || approvalPending ? (
        <Loading />
      ) : (
        <Table rows={approvalsColumns} content={data?.data || []} openModal={() => { }}>
          {(rowData) => {

            if (rowData.status == "REJECTED") {

              return <div className="grid"><Button
                size="sm"
                variant="outline"
                className="text-red-600 bg-red-100 hover:bg-red-50 hover:text-red-700 cursor-pointer"
                disabled
              >
                <XCircle className="h-4 w-4 mr-1" />
                Rejected
              </Button></div>

            }


            if (rowData.status == "APPROVED") {

              return <div className="grid">
                <Button size="sm" className="bg-green-500 cursor-pointer success " disabled onClick={() => approvalMutate({ bookingId: rowData.id })}>
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Approved
                </Button>
              </div>

            }

            return <div className="flex justify-end gap-2">
              <Button size="sm" className="hover:bg-green-70 cursor-pointer success " disabled={approvalPending} onClick={() => approvalMutate({ bookingId: rowData.id })}>
                <CheckCircle className="h-4 w-4 mr-1" />
                Approve
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 cursor-pointer"
                onClick={() => rejectMutate({ bookingId: rowData.id })}
                disabled={rejectionPending}
              >
                <XCircle className="h-4 w-4 mr-1" />
                Reject
              </Button>
            </div>
          }}
        </Table>
      )}


    </div>
  )
}