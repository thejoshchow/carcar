import { useState } from "react"
import { FormSelect, Table } from "react-bootstrap";


const SalesrepHistory2 = ( {salesreps, getSalesHistory }) => {
    const [history, setHistory] = useState([]);

    const handleChange = async (e) => {
        if (e.target.value) {
            const data = await getSalesHistory(e.target.value)
            setHistory(data);
        }
    }

    return (
        <div>
            <h1>Sales rep history</h1>
            <FormSelect onChange={handleChange}>
                <option value=''>Select a sales rep</option>
                {salesreps.map((rep) => {
                    return (
                            <option value={rep.employee_id} key={rep.employee_id}>{rep.first_name} {rep.last_name}</option>
                        )
                })}
            </FormSelect>
            <Table striped>
                <thead>
                    <tr>
                        <th>Sales rep</th>
                        <th>Customer</th>
                        <th>VIN</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {history.map((sale) => {
                        return(
                            <tr key={sale.id}>
                                <td>{sale.salesrep.first_name} {sale.salesrep.last_name}</td>
                                <td>{sale.customer.first_name} {sale.customer.last_name}</td>
                                <td>{sale.auto.vin}</td>
                                <td>{sale.price}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    );
}

export default SalesrepHistory2;