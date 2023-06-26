import { useState } from "react";

function ResizeCanvasForm({changeSize}) {
    const SIZELIMIT = 32;
    const [sizeValue, setSizeValue] = useState(8);

    const handleSubmit = e => {
        e.preventDefault();
        if (sizeValue === "") return;
        if (parseInt(sizeValue) === 0) return;

        changeSize(sizeValue);
    }

    const handleChange = e => {
        let newValue = e.target.value
            .split('')
            .filter(letter => "0123456789\b".includes(letter))
            .join('');

        newValue = newValue === "" ? 0 : newValue;

        const parsedValue = parseInt(newValue) > SIZELIMIT ? SIZELIMIT : parseInt(newValue);
        setSizeValue(parsedValue);
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-nowrap justify-center items-center">
            <label htmlFor="size-board" className="inline-flex items-center justify-center">
                Size:
            </label>
            <input
                className="flex-grow w-8 bg-slate-800 text-white px-3 py-1 m-2 h-10"
                type="text"
                placeholder='8'
                name="size"
                id="size-board"
                maxLength={2}
                onChange={handleChange}
                value={sizeValue}
            />
            <button type="submit" className="bg-teal-500 text-slate-950 px-4 py-2 h-10">
                <span>Apply</span>
                <i className='bx bx-check'></i>
            </button>
        </form>
    )
}

export default ResizeCanvasForm;