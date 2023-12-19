import { useEffect, useState } from "react";

const ListVehicles = () => {
    const [models, setModels] = useState({});
    const getData = async () => {
        const vehiclesUrl = "http://localhost:8100/api/models/"
    
        const response = await fetch(vehiclesUrl);
        if (response.ok) {
            const data = await response.json();
            setModels(data);
        }
    }

    useEffect(() => {
        getData();
    }, [])

    if (models.models === undefined) {
        return null;
    } else {
        return (
        <div className="container">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Vehicle Models</th>
                    </tr>
                </thead>
                <tbody>
                    {models.models.map((model) => {
                        return (
                            <tr key={model.id}>
                                <td>{model.name}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
        )
    }
}

export default ListVehicles;