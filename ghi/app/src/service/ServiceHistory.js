import { useEffect, useState } from "react";

const ServiceHistory = ({ getAppts }) => {
    const [appts, setAppts] = useState([]);

    const getData = async () => {
        const apptUrl = "http://localhost:8080/api/appointments/history/";
        const data = await getAppts(apptUrl);
        setAppts(data); 
        }

    useEffect(() => {
        getData();
    }, [])

    return (
        <div className="container">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>VIN</th>
                        <th>Customer Name</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Reason</th>
                        <th>Technician</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {appts.map(appt => {
                        return (
                            <tr key={appt.id}>
                                <td>{appt.vin}</td>
                                <td>{appt.customer}</td>
                                <td>{new Date(appt.date_time).toLocaleDateString()}</td>
                                <td>{new Date(appt.date_time).toLocaleTimeString()}</td>
                                <td>{appt.reason}</td>
                                <td>{appt.technician.name}</td>
                                <td>{appt.status}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default ServiceHistory;