import data from '../assets/test_data.json'

const Table = () => {
    const rows = [
        "ID","Name", "Quantity","Type", "Location","Status", "Comment", "Action",
    ]
    return (
        <table id="dashboard_table">
            <thead>
                <tr>
                    {
                        rows.map((row, index) => (
                            <th key={index}>
                                <button className='table__row'>{row}</button>
                            </th>
                        ))
                    }
                </tr>
            </thead>
            <tbody id="table_content">
            {data.map((row, index) => (
                    <tr key={index}>
                        <td>{row.pk}</td>
                        <td>{row.fields.name}</td>
                        <td>{row.fields.quantity}</td>
                        <td>{row.fields.type}</td>
                        <td>{row.fields.location}</td>
                        <td><span className="status status__available">{row.fields.status}</span></td>
                        <td>{row.fields.comment && ""}</td>
                        <td><button className="styled__button">Hello</button></td>
                    </tr>
            ))}
            </tbody>
        </table>
    );
};


export default Table;