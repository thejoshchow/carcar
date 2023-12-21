import { Table } from "react-bootstrap";

const ListSalesreps = ({ salesreps }) => {
    return (
        <Table striped>
            <thead>
                <tr>
                    <th>First name</th>
                    <th>Last name</th>
                    <th>Employee ID</th>
                </tr>
            </thead>
            <tbody>
                {salesreps.map((person) => {
                    return (
                        <tr>
                            <td>{person.first_name}</td>
                            <td>{person.last_name}</td>
                            <td>{person.employee_id}</td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    );
}

export default ListSalesreps;