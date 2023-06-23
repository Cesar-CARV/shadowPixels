function ColorButton({ color, click, showHex }) {
    return (
        <>
            {
                showHex &&
                <input
                    className='w-10 h-10 border-slate-800 cursor-pointer'
                    type="color"
                    onChange={click}
                    title={color}
                    value={color}
                />
            }

            {
                !showHex &&
                <button
                    className={"w-10 h-10 px-4 py-2 font-mono"}
                    onClick={() => click(color)}
                    style={{ backgroundColor: color }}
                    title={color}
                >
                    {showHex && color}
                </button>
            }
        </>
    )
}

export default ColorButton;