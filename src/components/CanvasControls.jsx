import { useState } from "react";
import MEASURES from '../utility/Measures';

function CanvasControls({ children, convertBoardToCSs }) {
    return (
        <section className='bg-gray-900 w-full h-auto max-w-max flex flex-col gap-2 p-2'>
            {children}
            <button
                className="bg-teal-500 text-slate-950 px-4 py-2"
                onClick={convertBoardToCSs}
            >
                <span>Get Code</span>
            </button>
        </section>
    )
}

export default CanvasControls;