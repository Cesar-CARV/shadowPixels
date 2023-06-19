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