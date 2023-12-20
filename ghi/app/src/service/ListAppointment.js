import { useEffect, useState } from "react";
import { Button, Modal } from 'react-bootstrap';

const ListAppointments = ({ getAppts }) => {
    const [appts, setAppts] = useState([]);
    const [show, setShow] = useState(false)
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getData = async () => {
        const apptUrl = "http://localhost:8080/api/appointments/";
        const data = await getAppts(apptUrl);
        setAppts(data);
    }

    useEffect(() => {
        getData();
    }, [])

    const handleCancel = async (e) => {
        const id = e.target.id;
        const cancelUrl = `http://localhost:8080/api/appointments/${id}/cancel/`
        const fetchOptions = {
            method: "put",
        }
        const response = await fetch(cancelUrl, fetchOptions);
        if (response.ok) {
            getData();
        }
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
        }
    }


    return (
        <div className="container">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>VIP</th>
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
                                <td>{appt.vip ? "✔" : ''}</td>
                                <td>{appt.vin}</td>
                                <td>{appt.customer}</td>
                                <td>{new Date(appt.date_time).toLocaleDateString()}</td>
                                <td>{new Date(appt.date_time).toLocaleTimeString()}</td>
                                <td>{appt.reason}</td>
                                <td>{appt.technician.name}</td>
                                <td>
                                    <Button className="btn btn-danger" variant="primary" onClick={handleShow} style={{marginRight: "10px"}}>Cancel</Button>
                                    <Modal show={show} onHide={handleClose}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Are you sure you want to cancel this appointment?</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <p>{appt.customer}</p>
                                            <p>{appt.vin}</p>
                                            <p>@</p>
                                            <p>{new Date(appt.date_time).toLocaleDateString()}</p>
                                            <p>{new Date(appt.date_time).toLocaleTimeString()}</p>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={handleClose}>Close</Button>
                                            <Button id={appt.id} variant="primary btn-danger" onClick={handleCancel}>Cancel appointment</Button>
                                        </Modal.Footer>
                                    </Modal>
                                    <Button onClick={handleComplete} value={appt.id} type="button" className="btn btn-success">Complete</Button>
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