import { useState } from "react";

function CanvasControls({ onApply }) {
    const callback = onApply;
    const SIZELIMIT = 32;
    const [sizeValue, setSizeValue] = useState(8);

    const handleChange = e => {
        let newValue = e.target.value
            .split('')
            .filter(letter => "0123456789\b".includes(letter))
            .join('');

        newValue = newValue === "" ? 0 : newValue;

        const parsedValue = parseInt(newValue) > SIZELIMIT ? SIZELIMIT : parseInt(newValue);
        setSizeValue(parsedValue);
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (sizeValue === "") return;
        if (parseInt(sizeValue) === 0) return;

        callback(sizeValue);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="">
                <span>Size: </span>
                <input
                    type="text"
                    placeholder='8'
                    name="size"
                    maxLength={2}
                    onChange={handleChange}
                    value={sizeValue}
                />
            </label>
            <button type="submit">
                <span>Apply</span>
                <i className='bx bxs-check-square'></i>
            </button>
        </form>
    )
}

export default CanvasControls;