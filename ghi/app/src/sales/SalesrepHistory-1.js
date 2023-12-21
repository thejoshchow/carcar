import { useEffect, useState } from "react"
import { Table } from "react-bootstrap";
import { useParams } from "react-router-dom";

const SalesrepHistory = ({ getSalesHistory }) => {
    const [history, setHistory] = useState([]);
    const { pk } = useParams();

    const getData = async () => {
        const data = await getSalesHistory(pk);
        setHistory(data);
    }

    useEffect(() => {
        getData();
    }, [])
    if (history[0] === undefined) {
        return null;
    } else {
        return (
            <div>
            <h1>Sales history for {history[0].salesrep.first_name} {history[0].salesrep.last_name}</h1>
            <Table striped>
                <thead>
                    <tr>
                        <th>Customer</th>
                        <th>VIN</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {history.map((sale) => {
                        return(
                            <tr key={sale.id}>
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
}

export default SalesrepHistory;