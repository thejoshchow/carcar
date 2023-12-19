import { useState } from "react";

const CreateManufacturer = () => {
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
            const data = await response.json();
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
        <div>
            <h1>Add a make:</h1>
            <div>
                <form className={formClasses} onSubmit={handleSubmit}>
                    <input onChange={changeMake} value={make} name="manufacturer" type="text" />
                    <button type="submit">Add</button>
                </form>
                <div className={messageClasses} id="success-message">
                    Vehicle model added
                </div>
            </div>
        </div>
    );
}

export default CreateManufacturer;