import { useState } from "react";
import MEASURES from '../utility/Measures';

function CanvasControls({ changeSize, changeMeasure }) {
    const SIZELIMIT = 32;
    const [sizeValue, setSizeValue] = useState(8);
    const [measure, setMeasure] = useState(MEASURES.REM);

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

        changeSize(sizeValue, measure);
    }

    const handleClick = e => {
        setMeasure(e.target.value);
        changeMeasure(e.target.value);
    }

    return (
        <section>
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
            <div className="flex gap-4">
                <p>Measure</p>
                <label>
                    <span>REM</span>
                    <input type="radio" name="measure" value={MEASURES.REM} onClick={handleClick} />
                </label>
                <label>
                    <span>PX</span>
                    <input type="radio" name="measure" value={MEASURES.PX} onClick={handleClick} />
                </label>
                <label>
                    <span>EM</span>
                    <input type="radio" name="measure" value={MEASURES.EM} onClick={handleClick} />
                </label>

            </div>
        </section>
    )
}

export default CanvasControls;