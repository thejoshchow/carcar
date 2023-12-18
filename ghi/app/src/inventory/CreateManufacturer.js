import { useState } from "react";

const CreateManufacturer = () => {
    const [make, setMake] = useState('');
    
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
            console.log(data);
        }
    }

    return (
        <div>
            <h1>Add a make:</h1>
            <div>
                <form onSubmit={handleSubmit}>
                    <input onChange={changeMake} value={make} name="manufacturer" type="text" />
                    <button type="submit">Add</button>
                </form>
            </div>
        </div>
    );
}

export default CreateManufacturer;