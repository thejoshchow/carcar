import { useEffect, useState } from "react";

const ListAppointments = ({ getAppts }) => {
    const [appts, setAppts] = useState([]);

    const getData = async () => {
        const apptUrl = "http://localhost:8080/api/appointments/";
        const data = await getAppts(apptUrl);
        setAppts(data);
    }

    useEffect(() => {
        getData();
    }, [])

    const handleCancel = (e, value) => {
        console.log(e.target.value)
    }

    const handleComplete = async (e) => {
        const id = e.target.value
        const completeUrl = `http://localhost:8080/api/appointments/${id}/finish/`;
        const fetchOptions = {
            method: "put",
        }
        const response = await fetch(completeUrl, fetchOptions);
        if (response.ok) {
            getData();
            console.log(response + "moved")
        }
    }


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
                        <th>Update Status</th>
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
                                <td>
                                    <button onClick={handleCancel} value={appt.id} type="button" className="btn btn-danger" style={{marginRight: "10px"}}>Cancel</button>
                                    <button onClick={handleComplete} value={appt.id} type="button" className="btn btn-success">Complete</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default ListAppointments;