function ColorButton({ color, click, showHex }) {
    return (
        <>
            {
                showHex &&
                <input
                    className='w-10 h-10 border-slate-800 cursor-pointer border rounded-md'
                    type="color"
                    onChange={click}
                    onBlur={click}
                    title={color}
                    value={color}
                />
            }

            {
                !showHex &&
                <button
                    className={'w-10 h-10 px-4 py-2 font-mono border border-slate-400 rounded-md'}
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