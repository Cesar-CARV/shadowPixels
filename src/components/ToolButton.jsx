import TOOLS from "../utility/Tools";

function ToolButton({ type, active, cb }) {
    const buttonActive = active;
    const typeButton = type;
    const callback = cb;

    return (
        <button
            className={`${buttonActive ? "bg-blue-500" : "bg-zinc-50"} ${buttonActive ? "text-zinc-50" : "text-zinc-800"} px-4 py-2 h-10 rounded-md`}
            onClick={callback}
        >
            {typeButton === TOOLS.PEN ? <i className='bx bxs-pencil'></i> : <></>}
            {typeButton === TOOLS.ERASER ? <i className='bx bxs-eraser'></i> : <></>}
            {typeButton === TOOLS.HAND ? <i className='bx bxs-hand'></i> : <></>}
            {typeButton === TOOLS.LENS ? <i className='bx bx-zoom-in'></i> : <></>}
            {typeButton === TOOLS.LENSOUT ? <i className='bx bx-zoom-out'></i> : <></>}
        </button>
    )
}

export default ToolButton;