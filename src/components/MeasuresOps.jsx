import { useState } from "react";
import MEASURES from '../utility/Measures';

function MeasuresOps({ changeMeasure }) {
    const [measure, setMeasure] = useState(MEASURES.REM);

    const handleClick = e => {
        setMeasure(e.target.value);
        changeMeasure(e.target.value);
    }

    return (
        <section>
            <p className="px-4 py-2 bg-gray-800">Measure</p>
            <div className="flex justify-around h-auto w-full p-2 gap-2 bg-slate-950">
                <input
                    type="button"
                    className={`${measure === MEASURES.REM ? "bg-teal-500" : "bg-slate-800"} ${measure === MEASURES.REM ? "text-slate-950" : "text-white"} cursor-pointer flex-grow px-4 py-2 h-10`}
                    value={MEASURES.REM}
                    onClick={handleClick}
                />

                <input
                    type="button"
                    className={`${measure === MEASURES.PX ? "bg-teal-500" : "bg-slate-800"} ${measure === MEASURES.PX ? "text-slate-950" : "text-white"} cursor-pointer flex-grow px-4 py-2 h-10`}
                    value={MEASURES.PX}
                    onClick={handleClick}
                />

                <input
                    type="button"
                    className={`${measure === MEASURES.EM ? "bg-teal-500" : "bg-slate-800"} ${measure === MEASURES.EM ? "text-slate-950" : "text-white"} cursor-pointer flex-grow px-4 py-2 h-10`}
                    value={MEASURES.EM}
                    onClick={handleClick}
                />
            </div>
        </section>
    )
}

export default MeasuresOps;