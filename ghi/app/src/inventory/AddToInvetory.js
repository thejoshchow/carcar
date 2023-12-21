import { useState } from "react";

const AutomobileForm = ({ models, getInventory }) => {
    const [added, setAdded] = useState(false);
    const [formChange, setFormChange] = useState({
        "color": '',
        "year": '',
        "vin": '',
        "modelId": '',
    })

    const handleFormChange = (e) => {
        setFormChange({
            ...formChange,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const d = {};
        d["color"] = formChange.color;
        d["year"] = formChange.year;
        d["vin"] = formChange.vin;
        d["model_id"] = formChange.modelId

        const submitUrl = "http://localhost:8100/api/automobiles/"
        const fetchOptions = {
            method: "post",
            body: JSON.stringify(d),
            headers: {
                "Content-Type": "application/json"
            }
        }

        const response = await fetch(submitUrl, fetchOptions)
        if (response.ok) {
            setFormChange({
                "color": '',
                "year": '',
                "vin": '',
                "modelId": ''
            })
            getInventory();
            setAdded(true);
        }

    }

    let messageClasses = 'alert alert-success d-none mb-0';
    let formClasses = '';
    if (added) {
        messageClasses = 'alert alert-success mb-0';
        formClasses = 'd-none';
    }

    return (
        <div className="offset-3 col-6">
            <h1 className="mb-3">Add to inventory</h1>
            <form className={formClasses} onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input onChange={handleFormChange} value={formChange.color} className="form-control" type="text" placeholder="Color" name="color"></input>
                </div>
                <div className="mb-3">
                    <input onChange={handleFormChange} value={formChange.year} className="form-control" type="number" placeholder="Year" name="year"></input>
                </div>
                <div className="mb-3">
                    <input onChange={handleFormChange} value={formChange.vin} className="form-control" type="text" placeholder="VIN" name="vin"></input>
                </div>
                <div className="mb-3">
                    <select onChange={handleFormChange} value={formChange.modelId} className="form-control" name="modelId">
                        <option value=''>Vehicle model</option>
                        {models.map((model) => {
                            return (
                                <option value={model.id} key={model.id}>{model.manufacturer.name} {model.name}</option>
                                )
                            })}
                    </select>
                </div>
                <button className="btn btn-primary" type="submit">Add automobile</button>
            </form>
            <div className={messageClasses} id="success-message">
                    Vehicle added to inventory
            </div>
        </div>
    )
}

export default AutomobileForm;