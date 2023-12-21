import { useState } from 'react';
import { Alert, Button, FloatingLabel, Form } from 'react-bootstrap';

const SalesrepForm = ({ getSalesreps }) => {
    const [added, setAdded] = useState(false);
    const [formChange, setFormChange] = useState({
        "firstName": '',
        "lastName": '',
        "employeeId": '',

    })

    const handleFormChange = (e) => {
        setFormChange({
            ...formChange,
            [e.target.name]: e.target.value
        })

    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const d = {};
        d["first_name"] = formChange.firstName;
        d["last_name"] = formChange.lastName;
        d["employee_id"] = formChange.employeeId;

        const salesrepUrl = "http://localhost:8090/api/salesreps/"
        const fetchOptions = {
            method: "post",
            body: JSON.stringify(d),
            headers: {
                "Content-Type": "application/json"
            }
        }

        const response = await fetch(salesrepUrl, fetchOptions);
        if (response.ok) {
            setAdded(true);
            getSalesreps();
        }
    }

    let messageClasses = 'd-none mb-0';
    let formClasses = '';
    if (added) {
        messageClasses = 'mb-0';
        formClasses = 'd-none';
    }

    return (
        <div className="offset-3 col-6">
            <h1 className="mb-3">Add sales rep</h1>
            <Form className={formClasses} onSubmit={handleSubmit}>
                <FloatingLabel label="First name" className="mb-3">
                    <Form.Control onChange={handleFormChange} value={formChange.firstName} type="text" name="firstName"/>
                </FloatingLabel>
                <FloatingLabel label="Last name" className="mb-3">
                    <Form.Control onChange={handleFormChange} value={formChange.lastName} type="text" name="lastName"/>
                </FloatingLabel>
                <FloatingLabel label="Employee ID" className="mb-3">
                    <Form.Control onChange={handleFormChange} value={formChange.employeeId} type="text" name="employeeId"/>
                </FloatingLabel>
                <Button type="submit" varient="primary">Submit</Button>
            </Form>
            <Alert className={messageClasses} variant="success">
                Sales rep added
            </Alert>
        </div>
    );
}

export default SalesrepForm;