import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from "react";
import "../../components/styling/dashboard.css";
import Table from "../../components/Table";
import Loading from "../../components/Loader";
import BookingModal from "../../components/BookingModal";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthorizedClient } from "../../hooks/useAuthorizedClient/useAuthorizedClient.tsx";
import { Equipment } from "../../types.spec.ts";

const Dashboard = () => {
  const queryClient = useQueryClient();
  const client = useAuthorizedClient()
  const [content, setContent] = useState<Equipment[]>([]);
  const [bookingModal, setBookingModal] = useState<boolean>(false);
  const [currentEquipment, setCurrentEquipment] = useState<number>(1);


  interface GetEquipments {
    data : Equipment[];
  }

  const getEquipments = async () => {
    return client.get("/equipments");
  }


  const { isPending, data, isSuccess} =  useQuery({
    queryKey: ["equipments"], queryFn: getEquipments})

  useEffect(() => {
    if(isSuccess){
      setContent(data.data)
    }
  },[isSuccess, data])

  const searchBar = useRef<HTMLInputElement>(null);

  function handleSearch(e: MouseEvent<HTMLButtonElement> ) {
    e.preventDefault();
    const originalData: GetEquipments | undefined = queryClient.getQueryData(["equipments"])
    if (!originalData) {
      return;
    }
    const searchTerm = searchBar.current?.value;
    if (searchTerm === "" || searchTerm === undefined) {
      setContent(originalData.data);
    } else {
      const searchResult = originalData.data.filter((item) => {
          console.log(item)
          return item.name.toLowerCase().includes(searchTerm.toLowerCase());

        }
      );
      setContent(searchResult);
    }
  }

  const handleFilter = (e: ChangeEvent<HTMLSelectElement>, type: string) => {
    let statusFilter = "";
    let typeFilter = "";
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const { data }: GetEquipments | undefined = queryClient.getQueryData(["equipments"])

    if (type == "type") {
      typeFilter = e.target.value;
    } else {
      statusFilter = e.target.value;
    }

    setContent(() => {
      return data.filter((item : Equipment) => {
        return (
          item.status
            .toLowerCase()
            .includes(statusFilter.trim().toLowerCase()) &&
          item.type.toLowerCase().includes(typeFilter.toLowerCase())
        );
      });
    });
  };

  const openBookingModal = (id: number) => {
    setCurrentEquipment(id);
    setBookingModal(true);
  };

  
  return (
    <div className="dashboard">
      <h1 className="dashboard__title">Equipment List</h1>
      <form className="equipment__filter">
        <section className="equipment__filter__input">
          <section className="input__container search">
            <input
              disabled={isPending}
              className="input__field"
              type="text"
              name="searchInput"
              maxLength={150}
              id="search_input"
              ref={searchBar}
            />
            <button
              disabled={isPending}
              onClick={handleSearch}
              className="styled__button"
              id="search_button"
            >
              Search
            </button>
          </section>
          <div className="input__container">
            <div className="input__label">
              <p>Filter:</p>
            </div>
            <select
              disabled={isPending}
              onChange={(e) => handleFilter(e, "status")}
              name="status"
              id="filter__status"
            >
              <option value=" ">Status</option>
              <option value="Avail">Available</option>
              <option value="Pend">Pending</option>
              <option value="Decom">Decommissioned</option>
              <option value="Unavail">Unavailable</option>
              <option value="Loan">On Loan</option>
              <option value="Repair">Repairing</option>
            </select>

            <select
              disabled={isPending}
              onChange={(e) => handleFilter(e, "type")}
              name="type"
              id="filter__type"
            >
              <option value="">Type</option>
              <option value="PC">PC/Laptop</option>
              <option value="VRH">VR Headset</option>
              <option value="CS">Camera/Sensors</option>
              <option value="PP">PC Peripherals</option>
              <option value="Furn">Furniture</option>
              <option value="Trip">Tripod</option>
              <option value="VRC">VR Controller</option>
              <option value="PT">Phones/Tablets</option>
              <option value="PCBL">Power/Cable</option>
            </select>
          </div>
        </section>
        {/*{ user.isAdmin && (*/}
        {/*<button*/}
        {/*    className="styled__button"*/}
        {/*    id="add_equipment"*/}
        {/*    type="button"*/}
        {/*    onClick="toggleAddModal()"*/}
        {/*>*/}
        {/*    Add Equipment*/}
        {/*</button>*/}
        {/*) }*/}
      </form>
      { bookingModal &&
        <BookingModal
        equipmentList={content}
        current={currentEquipment}
        toggleModal={() => setBookingModal(!bookingModal)}
        open={bookingModal}
        refresh={()=> queryClient.invalidateQueries({queryKey: ["equipments"]})}
      /> }

      {isPending ? (
        <Loading />
      ) : (
        <Table openModal={openBookingModal}  content={content}/>
      )}
    </div>
  );
};

export default Dashboard;
