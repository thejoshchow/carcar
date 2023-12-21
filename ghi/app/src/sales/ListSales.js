import { useEffect, useState } from "react";
import { Table } from "react-bootstrap"

const ListSales = ({ getSalesHistory }) => {
    const [sales, setSales] = useState([]);
    const getData = async () => {
        const data = await getSalesHistory();
        setSales(data);
    }
    useEffect(() => {
        getData();
    }, [])
    if (sales === undefined) {
        return null;
    } else {
        return (
            <Table striped>
            <thead>
                <tr>
                    <th>Sales rep</th>
                    <th>Employee ID</th>
                    <th>Customer</th>
                    <th>VIN</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {sales.map((sale) => {
                    return (
                        <tr key={sale.id}>
                            <td>{sale.salesrep.first_name} {sale.salesrep.last_name}</td>
                            <td>{sale.salesrep.employee_id}</td>
                            <td>{sale.customer.first_name} {sale.customer.last_name}</td>
                            <td>{sale.auto.vin}</td>
                            <td>{sale.price}</td>
                        </tr>
                            )
                        })}
            </tbody>
        </Table>
        );
    }
}

export default ListSales;