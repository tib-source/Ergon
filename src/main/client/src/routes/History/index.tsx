import { Key, useEffect, useState } from "react";
import TableCard from "../../components/TableCard";
import TableCardContainer from "../../components/TableCardContainer";
import "../../components/styling/history.css";
import { Tab, Tabs } from "@/components/Tabs";
import Loader from "../../components/Loader";
import Loading from "../../components/Loader";
import { useAuthorizedClient } from "../../hooks/useAuthorizedClient/useAuthorizedClient.tsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Booking } from "@/types.spec.ts";
import { useBookingList } from "@/hooks/useBookingList.tsx";

const History: React.FC = () => {

  const rows = ["ID", "Name", "Request Date", "Action"];
  const [filtered, setFiltered] = useState<Booking[]>([]);
  const [currentTab, setCurrentTab] = useState("Pending");
  const client = useAuthorizedClient();
  const tabRows = ["Pending", "Approved", "Returned"];
  const queryClient = useQueryClient();
  const [data, setData] = useState<Booking[]>([]);
  const { isPending, isSuccess, data: response } = useBookingList();

  useEffect(() => {
    if (isSuccess) {
      setData(response.data);
    }
  }, [isSuccess, response]);

  useEffect(() => {

    const filterData = (tabName: string) => {
      if (tabName === "Pending") {
        setFiltered(data.filter(booking => !booking.approved));
      } else if (tabName === "Approved") {
        setFiltered(data.filter(booking => booking.approved));
      } else {
        setFiltered(data.filter(booking => booking.returned));
      }
    };

    filterData(currentTab);
  }, [data, currentTab]);

  const cancelBooking = async (id: string) => {
    return client.delete(`/bookings/${id}`);
  };

  const { mutate, isPending: cancelPending } = useMutation(
    {
      mutationFn: (id: string) => cancelBooking(id),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["bookings", "history"] })
    }
  );

  return (
    <div className="history">
      <h1 className="history__title">History</h1>
      {isPending ? <Loader /> :
        <Tabs handleFilter={setCurrentTab}>
          {tabRows.map((tabName, index) => (
            <Tab key={index} label={tabName}>
              {cancelPending ? <Loading /> : <TableCardContainer rows={rows}>
                {filtered.length === 0 && (
                  <TableCard rows={[`No ${currentTab.toLowerCase()} bookings found.`]} fontSize={1.2}
                             className={"card-empty"} />

                )}
                {filtered.map((booking: Booking, index: Key) => (
                  <TableCard key={index} rows={[booking.id, booking.equipment, booking.bookedFrom]}>
                    <td>
                      {
                        currentTab === "Pending" ? (
                            <button className="styled__button" onClick={() => mutate(booking.id)}>Cancel</button>
                          )
                          : currentTab === "Approved" ? (
                              <button className="styled__button">Return</button>
                            )
                            : (
                              <button className="styled__button">Rebook</button>
                            )

                      }
                    </td>
                  </TableCard>
                ))}
              </TableCardContainer>}
            </Tab>

          ))}
        </Tabs>
      }
    </div>
  );
};

export default History;