import { useState } from 'react'
import { Form, FloatingLabel, Button, Alert } from 'react-bootstrap'

const SaleForm = ({ inventory, salesreps, customers, getSales, getInventory }) => {
    const [added, setAdded] = useState(false);
    const [formChange, setFormChange] = useState({
        "auto": '',
        "salesrep": '',
        "customer": '',
        "price": '',
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
        d['auto'] = formChange.auto;
        d['salesrep'] = formChange.salesrep;
        d['customer'] = formChange.customer;
        d['price'] = formChange.price;

        const saleUrl = "http://localhost:8090/api/sales/"
        const fetchOptions = {
            method: "post",
            body: JSON.stringify(d),
            headers: {
                "Content-Type": "application/json"
            }
        }
        const response = await fetch(saleUrl, fetchOptions);
        if (response.ok) {
            setAdded(true);
            getSales();
            getInventory();
        }
    }

    let formClasses = '';
    let messageClasses = 'd-none mb-0';
    if (added) {
        formClasses = 'd-none';
        messageClasses = 'mb-0';
    }


    return (
        <div className="offset-3 col-6">
            <h1 className="mb-3">Report sale</h1>
            <Form onSubmit={handleSubmit} className={formClasses}>
                <Form.Group className="mb-3">
                    <FloatingLabel label="Vehicle">
                        <Form.Select onChange={handleFormChange} value={formChange.auto} name="auto">
                            <option>Select a vehicle</option>
                            {inventory.filter(auto => !auto.sold).map(auto => {
                                return (
                                    <option value={auto.vin} key={auto.vin}>{auto.vin}</option>
                                    )
                                })}
                        </Form.Select>
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3">
                    <FloatingLabel label="Sales rep">
                        <Form.Select onChange={handleFormChange} value={formChange.salesrep} name="salesrep">
                            <option>Select a sales rep</option>
                            {salesreps.map(rep => {
                                return <option value={rep.employee_id} key={rep.employee_id}>{rep.first_name} {rep.last_name}</option>
                            })}
                        </Form.Select>
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3">
                    <FloatingLabel label="Customer">
                        <Form.Select onChange={handleFormChange} value={formChange.customer} name="customer">
                            <option>Select a customer</option>
                            {customers.map(customer => {
                                return <option value={customer.id} key={customer.id}>{customer.first_name} {customer.last_name}</option>
                            })}
                        </Form.Select>
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3">
                    <FloatingLabel label="Price">
                        <Form.Control onChange={handleFormChange} value={formChange.price} type="text" name="price" placeholder="Price"/>
                    </FloatingLabel>
                </Form.Group>
                <Button variant="primary" type="submit">Complete sale</Button>
            </Form >
            <Alert className={messageClasses} variant="success">
                Sale added
            </Alert>
        </div>
    )
}

export default SaleForm;