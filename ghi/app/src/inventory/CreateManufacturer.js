import { useState } from "react";

const CreateManufacturer = ({ getManufacturers }) => {
    const [make, setMake] = useState('');
    const [added, setAdded] = useState(false);
    
    const changeMake = (e) => {
        setMake(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const d = {}
        d["name"] = make;

        const createManfacturerUrl = "http://localhost:8100/api/manufacturers/"
        const fetchOptions = {
            method: "post",
            body: JSON.stringify(d),
            headers: {
                "Content-Type": "application/json"
            }
        }

        const response = await fetch(createManfacturerUrl, fetchOptions);
        if (response.ok) {
            setAdded(true);
            getManufacturers();
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
            <h1>Add a make:</h1>
            <div className="container">
                <form className={formClasses} onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input onChange={changeMake} value={make} className="form-control" name="manufacturer" type="text" placeholder="Make"/>
                    </div>
                    <div className="mb-3">
                        <button className="btn btn-primary" type="submit">Add</button>
                    </div>
                </form>
                <div className={messageClasses} id="success-message">
                    Manufacturer added
                </div>
            </div>
        </div>
    );
}

export default CreateManufacturer;