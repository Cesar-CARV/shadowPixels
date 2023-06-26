import ToolButton from "./ToolButton";
import ColorButton from "./ColorButton";
import TOOLS from "../utility/Tools";

function ToolButtons({currentTool, currentColor, setCurrentTool, handleClickColor}) {
    return (
        <section className='flex flex-wrap justify-left align-center gap-2'>
            <ToolButton
                type={TOOLS.PEN}
                active={currentTool === TOOLS.PEN}
                cb={() => setCurrentTool(TOOLS.PEN)}
            />
            <ToolButton
                type={TOOLS.ERASER}
                active={currentTool === TOOLS.ERASER}
                cb={() => setCurrentTool(TOOLS.ERASER)}
            />
            <ToolButton
                type={TOOLS.HAND}
                active={currentTool === TOOLS.HAND}
                cb={() => setCurrentTool(TOOLS.HAND)}
            />
            <ToolButton
                type={TOOLS.LENS}
                active={currentTool === TOOLS.LENS}
                cb={() => setCurrentTool(TOOLS.LENS)}
            />
            <ColorButton
                color={currentColor}
                click={handleClickColor}
                showHex={true}
            />
        </section>
    )
}

export default ToolButtons;