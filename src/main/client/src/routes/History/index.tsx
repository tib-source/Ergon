import { Key, useEffect, useState } from 'react';
import Card from '../../components/Card';
import CardTable from '../../components/CardTable';
import '../../components/styling/history.css';
import { Tab, Tabs } from '../../components/Tabs';
import Env from '../../Env';
import Loader from '../../components/Loader';

const History: React.FC = () => {

    const rows = ["ID", "Name", "Request Date", "Action"];
    interface Booking {
        id: string;
        equipment: {
            id: string;
            name: string;
        };
        booked_from: string;
        status: string;
        returned: boolean;
        approved: boolean;
    }
    const [data, setData] = useState<Booking[]>([]);
    const [filtered, setFiltered] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentTab, setCurrentTab] = useState('Pending');
    const tabRows = ['Pending', 'Approved', 'Returned'];

    const fetchData = async () => {
        try {
            const response = await fetch(`${Env.BASE_URL}/bookings`);
            const bookings = await response.json();
            setData( bookings);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false); // Hide loading indicator
        }
    }



    const filterData = (tabName: string) => {
        if (tabName === 'Pending') {
            setFiltered(data.filter(booking => !booking.approved));
        } else if (tabName === 'Approved') {
            setFiltered(data.filter(booking => booking.approved));
        } else {
            setFiltered(data.filter(booking => booking.returned));
        }
    }

    useEffect(() => {
        if (loading) {
            setTimeout(fetchData, 500);
        }
    }, []);

    useEffect(() => {
        filterData(currentTab); 
    }, [data, currentTab]);

        // TODO: Implement the cancel booking functionality
    const cancelBooking = async (id: string) => {
        try {
            const response = await fetch(`${Env.BASE_URL}/bookings/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setData(data.filter(booking => booking.id !== id));
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className='history'>
            <h1 className="history__title">History</h1>
            { loading ? <Loader/> : 
            <Tabs handleFilter={setCurrentTab}>
                {tabRows.map((tabName, index) => (
                    <Tab  key={index} label={tabName}>
                        <CardTable rows={rows}>
                        {filtered.length === 0 && (
                            <div className='card-error'>
                                <span> No Results Found </span>
                            </div>
                            )}
                        {filtered.map((booking: Booking, index: Key ) => (
                                <Card key={index} rows={[booking.id, booking.equipment.name, booking.booked_from]}>
                                    {
                                        currentTab === 'Pending' ? (
                                            <button className='styled__button' onClick={() => cancelBooking(booking.id)}>Cancel</button>
                                        )
                                        : currentTab === 'Approved' ? (
                                            <button className='styled__button'>Return</button>
                                        )
                                        : (
                                            <button className='styled__button'>Rebook</button>
                                        )

                                    }
                                </Card>
                            ))}
                        </CardTable>
                    </Tab>

                ))}
            </Tabs>
        }
        </div>
    );
};

export default History;