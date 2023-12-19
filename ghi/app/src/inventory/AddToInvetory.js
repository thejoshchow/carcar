import { useState } from "react";

const AutomobileForm = ({ models, getInventory }) => {
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
        }

    }

    return (
        <div className="">
            <h1>Add to inventory</h1>
            <form onSubmit={handleSubmit}>
                <input onChange={handleFormChange} value={formChange.color} className="form-control" type="text" placeholder="Color" name="color"></input>
                <input onChange={handleFormChange} value={formChange.year} className="form-control" type="number" placeholder="Year" name="year"></input>
                <input onChange={handleFormChange} value={formChange.vin} className="form-control" type="text" placeholder="VIN" name="vin"></input>
                <select onChange={handleFormChange} value={formChange.modelId} className="form-control" name="modelId">
                    <option value=''>Vehicle model</option>
                    {models.map((model) => {
                        return (
                            <option value={model.id} key={model.id}>{model.manufacturer.name} {model.name}</option>
                        )
                    })}
                </select>
                <button className="btn btn-primary" type="submit">Add automobile</button>
            </form>

        </div>
    )
}

export default AutomobileForm;