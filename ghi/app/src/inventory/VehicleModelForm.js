import { useState } from "react";

const VehicleModelForm = ({ manufacturers, getVehicleModels }) => {
    const [added, setAdded] = useState(false);
    const [formChange, setFormChange] = useState({
        "name": '',
        "pictureUrl": '',
        "make": '',
    });

    
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
            setFormChange({
                "name": '',
                "pictureUrl": '',
                "make": '',
            })
            setAdded(true);
            getVehicleModels();
        }

    }
    if (manufacturers === undefined) {
        return null;
    } else {
        let messageClasses = 'alert alert-success d-none mb-0';
        let formClasses = '';
        if (added) {
            messageClasses = 'alert alert-success mb-0';
            formClasses = 'd-none';
        }
        return (
            <>
            <div className={added ? "invisible" : ""}>
                <h1>Add a make:</h1>
                <div>
                    <div className="row">
                        <div className="col">
                            <form className={formClasses} onSubmit={handleSubmit} id="create-vehicle-model-form">
                                <input onChange={handleFormChange} value={formChange.name} className="form-control" type="text" name="name" placeholder="Model name"></input>
                                <input onChange={handleFormChange} value={formChange.pictureUrl} className="form-control" type="url" name="pictureUrl" placeholder="Picture Url"></input>
                                <select className="form-control" onChange={handleFormChange} name="make">
                                    <option value=''>Select a make:</option>
                                    {manufacturers.map((make) => {
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
            <div className={messageClasses} id="success-message">
                Vehicle model added
            </div>
            </>
        );
    }
}

export default VehicleModelForm;