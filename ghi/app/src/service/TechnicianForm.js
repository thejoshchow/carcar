import { useState } from "react";

const TechnicianForm = ({ getTechs }) => {
    const [added, setAdded] = useState(false);
    const [formChange, setFormChange] = useState({
        "firstName": '',
        'lastName': '',
        'employeeId': '',
    })

    const handleChange = (e) => {
        setFormChange({
            ...formChange,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const d = {}
        d['first_name'] = formChange.firstName;
        d['last_name'] = formChange.lastName;
        d['employee_id'] = formChange.employeeId;

        const techUrl = "http://localhost:8080/api/technicians/"
        const fetchOptions = {
            method: "post",
            body: JSON.stringify(d),
            headers: {
                "Content-Type": "application/json"
            }
        }

        const response = await fetch(techUrl, fetchOptions);
        if (response.ok) {
            setAdded(true); 
            getTechs();
        }
    }

    let messageClasses = 'alert alert-success d-none mb-0';
    let formClasses = '';
    if (added) {
        messageClasses = 'alert alert-success mb-0';
        formClasses = 'd-none';
    }

    return (
        <>
        <div className="offset-3 col-6">
            <h1 className="mb-3">Add technician</h1>
            <form onSubmit={handleSubmit} className={formClasses}>
                <div className="container">
                    <div className="row mb-3">
                        <input onChange={handleChange} value={formChange.firstName} type="text" placeholder="First name" className="form-control" name="firstName"/>
                    </div>
                    <div className="row mb-3">
                        <input onChange={handleChange} value={formChange.lastName} type="text" placeholder="Last name" className="form-control" name="lastName"/>
                    </div>
                    <div className="row mb-3">
                        <input onChange={handleChange} value={formChange.employeeId} type="text" placeholder="Employee ID" className="form-control" name="employeeId"/>
                    </div>
                </div>
                <button className="btn btn-primary">Add tech</button>
            </form>
            <div className={messageClasses} id="success-message">
                Technician added
            </div>
        </div>
        </>
    )
}

export default TechnicianForm;