const ListInventory = ({ inventory }) => {
    return (
        <div className="container">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Vin</th>
                        <th>Make</th>
                        <th>Model</th>
                        <th>Year</th>
                        <th>Color</th>
                        <th>Sold</th>
                    </tr>
                </thead>
                <tbody>
                    {inventory.map((auto) => {
                        return (
                        <tr key={auto.id}>
                            <td>{auto.vin}</td>
                            <td>{auto.model.manufacturer.name}</td>
                            <td>{auto.model.name}</td>
                            <td>{auto.year}</td>
                            <td>{auto.color}</td>
                            <td>{auto.sold ? "Yes" : "No"}</td>
                        </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default ListInventory;