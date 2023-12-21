import { Table } from "react-bootstrap";

const ListCustomers = ({ customers }) => {
    return (
            <Table striped>
                <thead>
                    <tr>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Address</th>
                        <th>Phone number</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((person) => {
                        return (
                            <tr key={person.id}>
                                <td>{person.first_name}</td>
                                <td>{person.last_name}</td>
                                <td>{person.address}</td>
                                <td>{person.phone_number}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
    );
}

export default ListCustomers;