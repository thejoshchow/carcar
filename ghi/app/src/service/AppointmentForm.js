import { useState } from 'react';

const AppointmentForm = ({ techs, getAppts }) => {
    const [added, setAdded] = useState(false);
    const [formChange, setFormChange] = useState({
        "custName": "",
        "date": '',
        "time": '',
        "reason": '',
        "vin": '',
        "technician": '',
    });

    const handleFormChange = (e) => {
        setFormChange({
            ...formChange,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const d = {};
        d["date_time"] = `${formChange.date}T${formChange.time}`;
        d["reason"] = formChange.reason;
        d["vin"] = formChange.vin;
        d["customer"] = formChange.custName;
        d["technician"] = formChange.technician;

        const apptUrl = "http://localhost:8080/api/appointments/"
        const fetchOptions = {
            method: "post",
            body: JSON.stringify(d),
            headers: {
                "Content-Type": "application/json"
            }
        }

        const response = await fetch(apptUrl, fetchOptions);
        if (response.ok) {
            setAdded(true);
            getAppts(apptUrl);
        }
    }

    let messageClasses = 'alert alert-success d-none mb-0';
    let formClasses = '';
    if (added) {
        messageClasses = 'alert alert-success mb-0';
        formClasses = 'd-none';
    }

    return (
        <div className="offset-3 col-6">
            <h1 className="mb-3">Add appointment</h1>
            <form className={formClasses} onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                    <input onChange={handleFormChange} value={formChange.custName} type="text" id="cust-name" placeholder="" className="form-control" name="custName"></input>
                    <label htmlFor="cust-name">Customer name</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={handleFormChange} value={formChange.vin} type="text" className="form-control" id="vin" placeholder='' name="vin"></input>
                    <label htmlFor="vin">VIN</label>
                </div>
                <div className="mb-3">
                    <label>Date and time</label>
                    <input onChange={handleFormChange} value={formChange.date} type="date" className="form-control" name="date"></input>
                    <input onChange={handleFormChange} value={formChange.time} type="time" className="form-control" name="time"></input>
                </div>
                <div className="form-floating mb-3">
                    <textarea onChange={handleFormChange} value={formChange.reason} type="text" className="form-control" placeholder="" id="reason" name="reason" style={{height: "100px"}}></textarea>
                    <label htmlFor="reason">Reason for appointment</label>
                </div>
                <div className="form-floating mb-3">
                    <select onChange={handleFormChange} value={formChange.technician} id="technician" className="form-control form-select" name="technician">
                        <option value=''>Select a technician</option>
                        {techs.map((tech) => {
                            return (
                                <option value={tech.employee_id} key={tech.employee_id}>{`${tech.first_name} ${tech.last_name}`}</option>
                                )
                            })}
                    </select>
                    <label htmlFor="technician">Technician</label>
                </div>
                <button className="btn btn-primary" type="submit">Add appointment</button>
            </form>
            <div className={messageClasses}>
                Appointment added
            </div>
        </div>
    );
}

export default AppointmentForm;