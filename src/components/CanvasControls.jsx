import { useState } from "react";
import MEASURES from '../utility/Measures';

function CanvasControls({ children, convertBoardToCSs }) {
    return (
        <section className='bg-zinc-950 w-full h-auto max-w-max flex flex-col gap-2 p-4 rounded-lg'>
            {children}
            <button
                className="bg-zinc-50 text-slate-950 px-4 py-2 rounded-md"
                onClick={convertBoardToCSs}
            >
                <span>Get Code</span>
            </button>
        </section>
    )
}

export default CanvasControls;