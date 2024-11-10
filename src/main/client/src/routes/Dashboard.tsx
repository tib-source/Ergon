import "../components/styling/dashboard.css"
import Table from "../components/Table.tsx";


const Dashboard = () => {
    return (
        <div className="dashboard">
            <h1>Equipment List</h1>
            <form className="equipment__filter">
                <section className="equipment__filter__input">
                    <section className="input__container search">
                        <input
                            className="input__field"
                            type="text"
                            name="searchInput"
                            maxLength={150}
                            id="search_input"
                        />
                        <button className="styled__button" id="search_button">Search</button>
                    </section>
                    <div className="input__container">
                        <div className="input__label">
                            <p>Filter:</p>
                        </div>
                        <select name="status" id="filter__status" required>
                            <option value="Avail">Available</option>
                            <option value="Pend">Pending</option>
                            <option value="Decom">Decommisioned</option>
                            <option value="Unavail">Unavailable</option>
                            <option value="Loan">On Loan</option>
                            <option value="Repair">Repairing</option>
                        </select>

                        <select name="type" id="filter__type" required>
                            <option value="PC">PC/Laptop</option>
                            <option value="VRH">VR Headset</option>
                            <option value="CS">Camera/Sensors</option>
                            <option value="PP">PC Peripherals</option>
                            <option value="Furn">Furniture</option>
                            <option value="Trip">Tripod</option>
                            <option value="Oth">Other</option>
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
            <Table/>
        </div>
    );
};

export default Dashboard;