import ColorButton from "./ColorButton";

function History({ items, clear, updateColor }) {
    const history = Array.from(new Set(items));

    const handleClearClick = () => clear();
    const handleUpdateColorClick = color => updateColor(color);

    return (
        <section>
            <header>
                <h3>Color history</h3>
                <button onClick={handleClearClick}>
                    <i className='bx bxs-x-circle'></i>
                </button>
            </header>
            <ul>
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