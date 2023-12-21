import { useState } from "react"
import { Alert, Button, Col, FloatingLabel, Form, Row } from "react-bootstrap";

const CustomerForm = ({ getCustomers }) => {
    const [added, setAdded] = useState(false);
    const [formChange, setFormChange] = useState({
        "firstName": '',
        "lastName": '',
        "address1": '',
        "address2": '',
        "city": '',
        "state": '',
        "zip": '',
        "phoneNumber": '',
    })

    const handleFormChange = (e) => {
        setFormChange({
            ...formChange,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const d = {}
        d["first_name"] = formChange.firstName
        d["last_name"] = formChange.lastName
        d["address"] = `${formChange.address1} ${formChange.address2}, ${formChange.city}, ${formChange.state} ${formChange.zip}`
        d["phone_number"] = formChange.phoneNumber
        
        const custFormUrl = "http://localhost:8090/api/customers/";
        const fetchOptions = {
            method: "post",
            body: JSON.stringify(d),
            headers: {
                "Content-Type": "application/json"
            }
        }
        const response = await fetch(custFormUrl, fetchOptions);
        if (response.ok) {
            setAdded(true);
            getCustomers();
        }
    }

    let formClasses = "";
    let messageClasses = "d-none mb-0";
    if (added) {
        formClasses = "d-none";
        messageClasses = "mb-0";
    }

    return (
        <div className="offset-3 col-6">
            <h1 className="mb-3">Add customer</h1>
            <Form className={formClasses} onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Col>
                        <FloatingLabel label="First name">
                            <Form.Control onChange={handleFormChange} value={formChange.firstName} name="firstName" type="text"/>
                        </FloatingLabel>
                    </Col>
                    <Col>
                        <FloatingLabel label="Last name">
                            <Form.Control onChange={handleFormChange} value={formChange.lastName} name="lastName" type="text" />
                        </FloatingLabel>
                    </Col>
                </Row>
                <Form.Group className="mb-3">
                    <FloatingLabel label="Address">
                        <Form.Control onChange={handleFormChange} value={formChange.address1} type="text" name="address1" />
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3">
                    <FloatingLabel label="Address 2">
                        <Form.Control onChange={handleFormChange} value={formChange.address2} name="address2" type="text" />
                    </FloatingLabel>
                </Form.Group>
                <Row className="mb-3"> 
                    <Col>
                        <FloatingLabel label="City">
                            <Form.Control onChange={handleFormChange} value={formChange.city} type="text" name="city"/>
                        </FloatingLabel>
                    </Col>
                    <Col>
                        <FloatingLabel label="State">
                            <Form.Control onChange={handleFormChange} value={formChange.state} name="state" type="text" />
                        </FloatingLabel>
                    </Col>
                    <Col>
                        <FloatingLabel label="Zip">
                            <Form.Control onChange={handleFormChange} value={formChange.zip} name="zip" type="text" />
                        </FloatingLabel>
                    </Col>
                </Row>
                <FloatingLabel className="mb-3" label="Phone number">
                    <Form.Control onChange={handleFormChange} value={formChange.phoneNumber} name="phoneNumber" type="tel" />
                </FloatingLabel>
                <Button varient="primary" type="submit">Submit</Button>
            </Form>
            <Alert className={messageClasses} variant="success">
                Customer added
            </Alert>
        </div>
    )
}

export default CustomerForm;