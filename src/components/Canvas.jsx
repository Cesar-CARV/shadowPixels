import { useState, useEffect, useRef } from "react";
import PixelCanvas from "../utility/PixelCanvas.js";
import TOOLS from "../utility/Tools.js";

function Canvas({ color, tool }) {
    const canvasRef = useRef(null);
    const currentColor = color;
    const currentTool = tool;
    const [pointer, setPointer] = useState({ x: 0, y: 0 });
    const [pixelCanvas, setPixelCanvas] = useState();
    const [paint, setPaint] = useState(false);

    useEffect(() => {
        const newCtx = canvasRef.current.getContext('2d');
        setPixelCanvas(new PixelCanvas(canvasRef.current, newCtx, tool));
    }, []);

    useEffect(() => {
        if (pixelCanvas) {
            pixelCanvas.updateCurrentTool(tool);
        }
    }, [tool])

    const handleMouseDown = e => {
        setPaint(true);
        pixelCanvas.setPixel(e, currentColor);
    }

    const handleMouseUp = e => {
        setPaint(false);
        pixelCanvas.rezetHandToolPoint();
    }

    const handleMouseMove = e => {
        const x = e.pageX - canvasRef.current.offsetLeft;
        const y = e.pageY - canvasRef.current.offsetTop;

        const canvasPointer = pixelCanvas.updateCursorPoint(x, y);
        setPointer(canvasPointer);

        if (paint && currentTool !== TOOLS.LENS) {
            pixelCanvas.setPixel(e, currentColor);
        }
    }

    const handleResize = () => {
        pixelCanvas.zoomBoard(0);
    }

    const handleContextMenu = e => {
        e.preventDefault();
        return false;
    }

    return (
        <section>
            <canvas
                ref={canvasRef}
                onMouseMove={handleMouseMove}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onResize={handleResize}
                onContextMenu={handleContextMenu}
                id="canvas"
                className={`border-2 border-gray-500 rounded-sm 
                    ${currentTool === TOOLS.PEN ? "cursor-cell" : ""}
                    ${currentTool === TOOLS.ERASER ? "cursor-no-drop" : ""}
                    ${currentTool === TOOLS.HAND ? "cursor-move" : ""}
                    ${currentTool === TOOLS.LENS ? "cursor-zoom-in" : ""}
                `}
                width={400}
                height={400}
            >
                Tu navegador no soporta canvas
            </canvas>
            {/* canvas info */}
            <section>
                <div>

                </div>
                <div>
                    <span>X: {pointer.x}, Y: {pointer.y}</span>
                </div>
            </section>
        </section>
    )
}

export default Canvas;