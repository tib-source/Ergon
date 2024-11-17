import "../components/styling/dashboard.css"
import Table from "../components/Table.tsx";
import {ChangeEvent, MouseEvent, useEffect, useRef, useState} from "react";
import Loading from "../components/Loader.tsx";
import { Env } from "../Env.ts";
const Dashboard = () => {

    const [loading, setLoading] = useState(true);
    const data = useRef<Equipment[]>([])
    const [content, setContent] = useState<Equipment[]>([]);

    const fetchData = async () => {
        try {
            const response = await fetch(`${Env.BASE_URL}/equipments/`);
            const equipment = await response.json();
            data.current = equipment;
            setContent(equipment); // Directly set content with fetched data
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false); // Hide loading indicator
        }
    };

    useEffect(() => {
        if(loading){
            setTimeout(fetchData, 500);
        }
    }, []);

    console.log(data)

    const searchBar = useRef<HTMLInputElement>(null);

    function handleSearch(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        const searchTerm = searchBar.current?.value;
        if (searchTerm === "" || searchTerm === undefined) {
            setContent(data.current);
        } else {
            let searchResult = data.current.filter((item) =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase()))
            setContent(searchResult);
        }
    }

    const handleFilter = (e: ChangeEvent<HTMLSelectElement>, type: string) => {
        let statusFilter = "";
        let typeFilter = "";

        if (type == "type") {
            typeFilter = e.target.value
        } else {
            statusFilter = e.target.value
        }

        setContent(() => {
            return data.current.filter((item) => {
                return item.status.toLowerCase().includes(statusFilter.trim().toLowerCase()) &&
                    item.type.toLowerCase().includes(typeFilter.toLowerCase())
            })
        });
    }
    return (
        <div className="dashboard">
            <h1>Equipment List</h1>
            <form className="equipment__filter">
                <section className="equipment__filter__input">
                    <section className="input__container search">
                        <input
                            disabled={loading}
                            className="input__field"
                            type="text"
                            name="searchInput"
                            maxLength={150}
                            id="search_input"
                            ref={searchBar}
                        />
                        <button disabled={loading} onClick={handleSearch} className="styled__button" id="search_button">Search</button>
                    </section>
                    <div className="input__container">
                        <div className="input__label">
                            <p>Filter:</p>
                        </div>
                        <select disabled={loading} onChange={(e) => handleFilter(e, "status")} name="status" id="filter__status">
                            <option value=" ">Status</option>
                            <option value="Avail">Available</option>
                            <option value="Pend">Pending</option>
                            <option value="Decom">Decommissioned</option>
                            <option value="Unavail">Unavailable</option>
                            <option value="Loan">On Loan</option>
                            <option value="Repair">Repairing</option>
                        </select>

                        <select disabled={loading} onChange={(e) => handleFilter(e, "type")} name="type" id="filter__type">
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
            {loading ? (<Loading />) : (<Table content={content}/>)}

        </div>
    );
};

export default Dashboard;