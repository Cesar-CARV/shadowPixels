function ColorButton({ color, click, showHex }) {
    return (
        <button
            className={`${showHex ? "w-auto" : "w-10"} h-10 px-4 py-2 font-mono`}
            onClick={() => click(color)}
            style={{ backgroundColor: color }}>
            {showHex && color}
        </button>
    )
}

export default ColorButton;