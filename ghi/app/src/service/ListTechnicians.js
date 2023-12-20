const ListTechnicians = ({ techs }) => {
    return (
        <div className="container">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Employee ID</th>
                    </tr>
                </thead>
                <tbody>
                    {techs.map((tech) => {
                        return (
                            <tr key={tech.employee_id}>
                                <td>{`${tech.first_name} ${tech.last_name}`}</td>
                                <td>{tech.employee_id}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default ListTechnicians;