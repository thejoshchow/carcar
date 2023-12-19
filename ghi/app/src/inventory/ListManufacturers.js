const ListManufacturers = ({ manufacturers }) => {
    return (
        <div className="container">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Manufacturer</th>
                    </tr>
                </thead>
                <tbody>
                    {manufacturers.map((make) => {
                        return (
                            <tr key={make.id}>
                                <td>{make.name}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default ListManufacturers;