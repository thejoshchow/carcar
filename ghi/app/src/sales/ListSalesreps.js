import { Table } from "react-bootstrap";
import { Link } from 'react-router-dom'

const ListSalesreps = ({ salesreps }) => {
    return (
        <Table striped>
            <thead>
                <tr>
                    <th>Employee ID</th>
                    <th>First name</th>
                    <th>Last name</th>
                </tr>
            </thead>
            <tbody>
                {salesreps.map((person) => {
                    return (
                        <tr key={person.employee_id}>
                            <td><Link to={`${person.employee_id}`}>{person.employee_id}</Link></td>
                            <td>{person.first_name}</td>
                            <td>{person.last_name}</td>
                            </tr>
                        
                    )
                })}
            </tbody>
        </Table>
    );
}

export default ListSalesreps;