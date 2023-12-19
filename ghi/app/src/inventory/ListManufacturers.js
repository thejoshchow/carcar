const ListManufacturers = ({ manufacturers }) => {
    return (
        <div>
            <table>
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