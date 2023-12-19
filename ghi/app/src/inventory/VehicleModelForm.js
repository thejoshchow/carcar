import { useEffect, useState } from "react";

const VehicleModelForm = () => {
    const [makes, setMakes] = useState({});
    const [formChange, setFormChange] = useState({
        "name": '',
        "pictureUrl": '',
        "make": '',
    })

    const getData = async () => {
        const makesUrl = "http://localhost:8100/api/manufacturers/"
        const response = await fetch(makesUrl);
        if (response.ok) {
            const data = await response.json();
            setMakes(data);
        }
    }

    useEffect(() => {
        getData();
    }, [])

    
    const handleFormChange = (e) => {
        setFormChange({
            ...formChange,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const d = {}
        d["name"] = formChange.name;
        d["picture_url"] = formChange.pictureUrl;
        d["manufacturer_id"] = formChange.make;

        const addVehicleModel = "http://localhost:8100/api/models/"
        const fetchOptions = {
            method: "post",
            body: JSON.stringify(d),
            headers: {
                "Content-Type": "application/json"
            }
        }

        const response = await fetch(addVehicleModel, fetchOptions);
        if (response.ok) {
            const data = await response.json();
            console.log(data);

            setFormChange({
                "name": '',
                "pictureUrl": '',
                "make": '',
            })
        }
    }
    if (makes.manufacturers === undefined) {
        return null;
    } else {
        return (
            <div>
                <h1>Add a make:</h1>
                <div>
                    <div className="row">
                        <div className="col">
                            <form onSubmit={handleSubmit}>
                                <input onChange={handleFormChange} value={formChange.name} className="form-control" type="text" name="name" placeholder="Model name"></input>
                                <input onChange={handleFormChange} value={formChange.pictureUrl} className="form-control" type="url" name="pictureUrl" placeholder="Picture Url"></input>
                                <select className="form-control" onChange={handleFormChange} name="make">
                                    <option value=''>Select a make:</option>
                                    {makes.manufacturers.map((make) => {
                                        return (
                                            <option key={make.id} value={make.id}>{make.name}</option>
                                            )
                                        })}
                                </select>
                                <button type="submit">Create model</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default VehicleModelForm;