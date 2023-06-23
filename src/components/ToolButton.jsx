import TOOLS from "../utility/Tools";

function ToolButton({ type, active, cb }) {
    const buttonActive = active;
    const typeButton = type;
    const callback = cb;

    return (
        <button
            className={`${buttonActive ? "bg-teal-500" : "bg-slate-800"} ${buttonActive ? "text-slate-950" : "text-white"} px-4 py-2 h-10`}
            onClick={callback}
        >
            {typeButton === TOOLS.PEN ? <i className='bx bxs-pencil'></i> : <></>}
            {typeButton === TOOLS.ERASER ? <i className='bx bxs-eraser'></i> : <></>}
            {typeButton === TOOLS.HAND ? <i className='bx bxs-hand'></i> : <></>}
            {typeButton === TOOLS.LENS ? <i className='bx bx-search-alt'></i> : <></>}
        </button>
    )
}

export default ToolButton;