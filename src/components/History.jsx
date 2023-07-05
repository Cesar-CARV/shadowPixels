import ColorButton from "./ColorButton";

function History({ items, clear, updateColor }) {
    const history = Array.from(new Set(items));

    const handleClearClick = () => clear();
    const handleUpdateColorClick = color => updateColor(color);

    return (
        <section className="rounded-lg overflow-hidden">
            <header className="flex justify-between px-4 py-2 bg-zinc-700">
                <h3>Color history</h3>
                <button onClick={handleClearClick}>
                    <i className='bx bxs-x-circle'></i>
                </button>
            </header>
            <ul className="flex h-20 w-full p-2 overflow-y-scroll flex-wrap gap-1 bg-zinc-800">
                {history.map((item, i) => (
                    <li key={i}>
                        <ColorButton color={item} click={handleUpdateColorClick} showHex={false}/>
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default History;