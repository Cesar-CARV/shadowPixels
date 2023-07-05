import { useState } from "react";
import MEASURES from '../utility/Measures';

function MeasuresOps({ changeMeasure }) {
    const [measure, setMeasure] = useState(MEASURES.REM);

    const handleClick = e => {
        setMeasure(e.target.value);
        changeMeasure(e.target.value);
    }

    return (
        <section className="rounded-lg overflow-hidden">
            <header className="flex justify-between px-4 py-2 bg-zinc-700">
                <h3>Measure</h3>
            </header>
            <div className="flex justify-around h-auto w-full p-2 gap-2 bg-zinc-800">
                <input
                    type="button"
                    className={`${measure === MEASURES.REM ? "bg-blue-500" : "bg-zinc-50"} ${measure === MEASURES.REM ? "text-zinc-50" : "text-zinc-800"} cursor-pointer flex-grow px-4 py-2 h-10 rounded-md`}
                    value={MEASURES.REM}
                    onClick={handleClick}
                />

                <input
                    type="button"
                    className={`${measure === MEASURES.PX ? "bg-blue-500" : "bg-zinc-50"} ${measure === MEASURES.PX ? "text-zinc-50" : "text-zinc-800"} cursor-pointer flex-grow px-4 py-2 h-10 rounded-md`}
                    value={MEASURES.PX}
                    onClick={handleClick}
                />

                <input
                    type="button"
                    className={`${measure === MEASURES.EM ? "bg-blue-500" : "bg-zinc-50"} ${measure === MEASURES.EM ? "text-zinc-50" : "text-zinc-800"} cursor-pointer flex-grow px-4 py-2 h-10 rounded-md`}
                    value={MEASURES.EM}
                    onClick={handleClick}
                />
            </div>
        </section>
    )
}

export default MeasuresOps;