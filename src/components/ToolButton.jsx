import TOOLS from "../utility/Tools";

function ToolButton({ type, active, cb }) {
    const buttonActive = active;
    const typeButton = type;
    const callback = cb;

    return (
        <button
            className={`${buttonActive ? "bg-indigo-500" : "bg-indigo-700"} text-white px-4 py-2`}
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